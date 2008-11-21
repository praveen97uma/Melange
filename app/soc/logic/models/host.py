#!/usr/bin/python2.5
#
# Copyright 2008 the Melange authors.
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

"""Host (Model) query functions.
"""

__authors__ = [
  '"Sverre Rabbelier" <sverre@rabbelier.nl>',
  ]


from soc.logic.models import role

import soc.models.host
import soc.models.role


class Logic(role.Logic):
  """Logic methods for the Host model.
  """

  def __init__(self):
    """Defines the name, key_name and model for this entity.
    """
    role.Logic.__init__(self, model=soc.models.host.Host,
                        base_model=soc.models.role.Role)


logic = Logic()
