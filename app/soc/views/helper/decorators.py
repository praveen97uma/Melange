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

"""Views decorators.
"""

__authors__ = [
  '"Doug Coker" <dcoker@google.com>',
  '"Sverre Rabbelier" <sverre@rabbelier.nl>',
  '"Pawel Solyga" <pawel.solyga@gmail.com>',
  ]


from functools import wraps

from django import http
from django.utils.translation import ugettext

from soc.logic import dicts
from soc.views.helper import responses


class Error(Exception):
  """Base class for all exceptions raised by this module.
  """

  pass


def view(func):
  """Decorator that insists that exceptions are handled by view.
  """

  @wraps(func)
  def view_wrapper(request, *args, **kwds):
    """View decorator wrapper method.
    """

    return func(request, *args, **kwds)

  return view_wrapper


def merge_params(func):
  """Decorator that merges 'params' with self._params.
  """

  @wraps(func)
  def wrapper(self, *args, **kwargs):
    """Decorator wrapper method.
    """
    params = kwargs.get('params', {})
    kwargs['params'] = dicts.merge(params, self._params)
    return func(self, *args, **kwargs)

  return wrapper


def check_access(func):
  """This decorator does access checks for the specified view method.

  The rights dictionary is extracted from 'params', or, if either 'params' or
  'rights' do not exist, from self._params['rights'].
  """

  # Do not pollute helper.decorators with access specific imports
  from soc.views import out_of_band
  from soc.views import helper
  from soc.views.helper import responses

  @wraps(func)
  def wrapper(self, request, access_type, *args, **kwargs):
    """Decorator wrapper method.
    """
    params = kwargs.get('params', {})

    # Try to extract rights
    if 'rights' in params:
      rights = params['rights']
    else:
      rights = self._params['rights']

    check_kwargs = kwargs.copy()
    context = responses.getUniversalContext(request)
    responses.useJavaScript(context, self._params['js_uses_all'])

    id = context['account']
    user = context['user']

    check_kwargs['GET'] = request.GET
    check_kwargs['POST'] = request.POST
    check_kwargs['context'] = context

    # reset and pre-fill the Checker's cache
    rights.setCurrentUser(id, user)

    # Do the access check dance
    try:
      rights.checkAccess(access_type, check_kwargs)
    except out_of_band.Error, error:
      return helper.responses.errorResponse(error, request)
    return func(self, request, access_type, *args, **kwargs)

  return wrapper


def mutation(func):
  """This decorator indicates that the view is a mutation operation and is
  therefore restricted to POST requests.

  XSRF checking is performed automatically by the xsrf middleware.
  """
  @wraps(func)
  def wrapper(self, request, *args, **kwargs):
    if request.method != "POST":
      return http.HttpResponse("Invoked a mutation view w/o POST.", status=403)

    return func(self, request, *args, **kwargs)

  return wrapper
