#!/usr/bin/python2.5
#
# Copyright 2009 the Melange authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Cron job handler for Student Proposal mailing.
"""

__authors__ = [
    '"Lennard de Rijk" <ljvderijk@gmail.com>',
  ]


import logging

from soc.logic.models.job import logic as job_logic
from soc.logic.models.priority_group import logic as priority_logic
from soc.logic.models.program import logic as program_logic
from soc.logic.models.student import logic as student_logic
from soc.logic.models.student_proposal import logic as proposal_logic


# amount of students to create jobs for before updating
DEF_STUDENT_STEP_SIZE = 10

# property text_data for a sendStudentProposalMail Job
DEF_STUDENT_PROPOSAL_MAIL_TEXT_DATA_FMT = '%s/proposal_mail'


def setupStudentProposalMailing(job_entity):
  """Job that setup jobs that will mail students if they have been accepted in
  a program with a GSoC-like workflow.

  Args:
    job_entity: a Job entity with key_data set to 
                [program, last_completed_student]
  """

  from soc.cron.job import FatalJobError


  # retrieve the data we need to continue our work
  key_data = job_entity.key_data
  program_key = key_data[0]
  program_keyname = program_key.name()

  program_entity = program_logic.getFromKeyName(program_keyname)

  if not program_entity:
    raise FatalJobError('The program with key %s could not be found' % (
        program_keyname))

  student_fields = {'scope': program_entity}

  if len(key_data) >= 2:
    # start where we left off
    student_fields['__key__ >'] = key_data[1]

  students = student_logic.getForFields(student_fields,
                                        limit=DEF_STUDENT_STEP_SIZE)

  # set the default fields for the jobs we are going to create
  priority_group = priority_logic.getGroup(priority_logic.EMAIL)
  job_fields = {
      'priority_group': priority_group,
      'task_name': 'sendStudentProposalMail'}

  job_query_fields = job_fields.copy()

  while students:
    # for each student create a mailing job
    for student in students:
      text_data = DEF_STUDENT_PROPOSAL_MAIL_TEXT_DATA_FMT % (
          student.key().name())

      job_query_fields['text_data'] = text_data
      mail_job = job_logic.getForFields(job_query_fields, unique=True)

      if not mail_job:
        # this student did not receive mail yet
        job_fields['text_data'] = text_data
        job_fields['key_data'] = [student.key()]
        job_logic.updateOrCreateFromFields(job_fields)

    # update our own job
    last_student_key = students[-1].key()

    if len(key_data) >= 2:
      key_data[1] = last_student_key
    else:
      key_data.append(last_student_key)

    updated_job_fields = {'key_data': key_data}
    job_logic.updateEntityProperties(job_entity, updated_job_fields)

    # rinse and repeat
    student_fields['__key__ >'] = last_student_key
    students = student_logic.getForFields(student_fields,
                                          limit=DEF_STUDENT_STEP_SIZE)

  # we are finished
  return

def sendStudentProposalMail(job_entity):
  """Job that will send out an email to a student that sent in a proposal
  that either got accepted or rejected.

  Args:
    job_entity: a Job entity with key_data set to [student_key]
  """

  from soc.cron.job import FatalJobError


  student_keyname = job_entity.key_data[0].name()
  student_entity = student_logic.getFromKeyName(student_keyname)

  if not student_entity:
    raise FatalJobError('The student with keyname %s does not exist!' % (
        student_keyname))

  # only students who have sent in a proposal will be mailed
  fields = {'scope': student_entity}
  proposal = proposal_logic.getForFields(fields, unique=True)

  if proposal:
    # check if the student has an accepted proposal
    fields['status'] = 'accepted'
    accepted_proposal = proposal_logic.getForFields(fields, unique=True)

    # TODO(ljvderijk) replace with real mail sending
    if accepted_proposal:
      logging.info('Sending acceptance mail to %s' % (student_entity.name()))
    else:
      logging.info('Sending rejectance mail to %s' % (student_entity.name()))

  # we are done here
  return
