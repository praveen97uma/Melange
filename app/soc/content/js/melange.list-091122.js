/* Copyright 2009 the Melange authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @author <a href="mailto:fadinlight@gmail.com">Mario Ferraro</a>
 */
(function () {
  /** @lends melange.list */

  if (window.melange === undefined) {
    throw new Error("Melange not loaded");
  }

  var melange = window.melange;

  /** Package that handles all lists related functions
    * @name melange.list
    * @namespace melange.list
    * @borrows melange.logging.debugDecorator.log as log
    */
  melange.list = window.melange.list = function () {
    return new melange.list();
  };

  /** Shortcut to current package.
    * @private
    */
  var $m = melange.logging.debugDecorator(melange.list);

  melange.error.createErrors([
    "listIndexNotValid",
    "divNotExistent",
    "indexAlreadyExistent"
  ]);

  var dummy_source = [];
  dummy_source[0] = {
    "": [
      {
        "id": "test",
        "name": "Test Example",
        "program_owner": "Google"
      },
      {
        "id": "test2",
        "name": "Test Example",
        "program_owner": "GooglePlex"
      }
    ]
  };
  dummy_source[1] = {
    "": [
      {
        "id": "test3",
        "name": "Mentor Test Example",
        "program_owner": "melange"
      },
      {
        "id": "test4",
        "name": "Mentor Test Example",
        "program_owner": "google1"
      }
    ],
    "test4": [
      {
        "id": "test5",
        "name": "Mentor Test Example Loaded Incrementally",
        "program_owner": "google1"
      }
    ],
    "test5": [
      {
        "id": "test6",
        "name": "Mentor Test Example Loaded Incrementally 2",
        "program_owner": "google1"
      }
    ]
  };
  dummy_source[2] = {
    "": [
      {
        "id": "test7",
        "name": "Admin Test Example",
        "program_owner": "melange"
      },
      {
        "id": "test8",
        "name": "Admin Test Example",
        "program_owner": "google1"
      }
    ],
    "test8": [
      {
        "id": "test9",
        "name": "Admin Test Example Loaded Incrementally",
        "program_owner": "google1"
      }
    ]
  };
  dummy_source[3] = {
    "": [
      {
        "id": "test10",
        "name": "Student Test Example",
        "program_owner": "Google"
      },
      {
        "id": "test11",
        "name": "Student Test Example",
        "program_owner": "GooglePlex"
      }
    ]
  };


  var list_objects = [];

  $m.loadList = function (div,idx) {
    var idx = parseInt(idx);
    if (isNaN(idx) || idx<0) {
      throw new melange.error.listIndexNotValid("List index "+idx+" is not valid");
    }
    if (list_objects[idx]) {
      throw new melange.error.indexAlreadyExistent("Index "+idx+" is already existent");
    } else {
      list_objects[idx] = {};
    }
    jQuery(
      function () {
        if (jQuery("#"+div).length===0) {
          throw new melange.error.divNotExistent("Div "+div+" is not existent");
        }
        list_objects[idx] = (
          function () {
            var start = "";
            list_objects[idx]["data"] = [];

            //create jqgrid object
            var looping = function () {
              jQuery.ajax({
                async: false,
                cache: false,
                url: [
                  window.location.href,
                  "?fmt=json&count=50",
                  (start===""?"":"&start="+start),
                  "&idx=",idx
                ].join(""),
                timeout: 10000,
                success: function (data) {
                  jQuery("#"+div).html("List number "+idx+" loaded");
                  console.debug("I'm idx "+idx+" with start "+start);
                  if (dummy_source[idx][start]!==undefined) {
                    var my_data = dummy_source[idx][start];
                    list_objects[idx]["data"].push(my_data);
                    //trigger jqgrid object

                    //call next iteration
                    start = my_data[(my_data.length-1)].id;
                    setTimeout(looping, 100);
                  }
                  else {
                    //can call a callback if needed
                  }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                  jQuery("#"+div).html("Error retrieving list number "+idx);
                }
              });
            }
            return setTimeout(
              looping,
              0
            );
          }
        );
        list_objects[idx]();
      }
    );
    function callback(idx) {
       console.debug("callback called for index "+idx);
       console.dir(list_objects[idx]["data"]);
    }
  }
}());
