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

  if (window.jLinq === undefined) {
    throw new Error("jLinq not loaded");
  }

  var jLinq = window.jLinq;

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
    "configuration": {
      "colNames": ["Key", "Link ID", "Name", "Program Owner"],
      "colModel": [
        {name: "key", index: "key", resizable: true},
        {name: "link_id", index: "link_id", resizable: true},
        {name: "name", index: "name", resizable: true},
        {name: "program_owner", index: "program_owner", resizable: true}
      ],
      rowNum: 4,
      rowList: [4, 8],
      autowidth: true,
      sortname: "link_id",
      sortorder: "asc"
    },
    "data": {
      "": [
        {
          "key": "key_test",
          "link_id": "test",
          "name": "Test Example",
          "program_owner": "Google"
        },
        {
          "key": "key_test2",
          "link_id": "test2",
          "name": "Test Example",
          "program_owner": "GooglePlex"
        }
      ],
      "key_test2": [
        {
          "key": "key_test2bis",
          "link_id": "test2bis",
          "name": "Test Example Loaded Incrementally",
          "program_owner": "Google"
        },
        {
          "key": "key_test2tris",
          "link_id": "test2tris",
          "name": "Test Example Loaded Incrementally",
          "program_owner": "GooglePlex"
        },
        {
          "key": "key_2ndpage",
          "link_id": "test2ndpage",
          "name": "Test Example 2nd page",
          "program_owner": "Google"
        }
      ]
    }
  };
  dummy_source[1] = {
    "configuration": {
      "colNames": ["Key", "Link ID", "Name", "Program Owner"],
      "colModel": [
        {name: "key", index: "key", resizable: true},
        {name: "link_id", index: "link_id", resizable: true},
        {name: "name", index: "name", resizable: true},
        {name: "program_owner", index: "program_owner", resizable: true}
      ],
      rowNum: 4,
      rowList: [4, 8],
      autowidth: true,
      sortname: "link_id",
      sortorder: "asc"
    },
    "data": {
      "": [
        {
          "key": "key_test3",
          "link_id": "test3",
          "name": "Mentor Test Example",
          "program_owner": "melange"
        },
        {
          "key": "key_test4",
          "link_id": "test4",
          "name": "Mentor Test Example",
          "program_owner": "google1"
        }
      ],
      "key_test4": [
        {
          "key": "key_test5",
          "link_id": "test5",
          "name": "Mentor Test Example Loaded Incrementally",
          "program_owner": "google1"
        }
      ],
      "key_test5": [
        {
          "key": "key_test6",
          "link_id": "test6",
          "name": "Mentor Test Example Loaded Incrementally 2",
          "program_owner": "google1"
        }
      ]
    }
  };
  dummy_source[2] = {
    "configuration": {
      "colNames": ["Key", "Link ID", "Name", "Program Owner"],
      "colModel": [
        {name: "key", index: "key", resizable: true},
        {name: "link_id", index: "link_id", resizable: true},
        {name: "name", index: "name", resizable: true},
        {name: "program_owner", index: "program_owner", resizable: true}
      ],
      rowNum: 4,
      rowList: [4, 8],
      autowidth: true,
      sortname: "link_id",
      sortorder: "asc"
    },
    "data": {
      "": [
        {
          "key": "key_test7",
          "link_id": "test7",
          "name": "Admin Test Example",
          "program_owner": "melange"
        },
        {
          "key": "key_test8",
          "link_id": "test8",
          "name": "Admin Test Example",
          "program_owner": "google1"
        }
      ],
      "key_test8": [
        {
          "key": "key_test9",
          "link_id": "test9",
          "name": "Admin Test Example Loaded Incrementally",
          "program_owner": "google1"
        }
      ]
    }
  };
  dummy_source[3] = {
    "configuration": {
      "colNames": ["Key", "Link ID", "Name", "Program Owner"],
      "colModel": [
        {name: "key", index: "key", resizable: true},
        {name: "link_id", index: "link_id", resizable: true},
        {name: "name", index: "name", resizable: true},
        {name: "program_owner", index: "program_owner", resizable: true}
      ],
      rowNum: 4,
      rowList: [4, 8],
      autowidth: true,
      sortname: "link_id",
      sortorder: "asc"
    },
    "data": {
      "": [
        {
          "key": "key_test10",
          "link_id": "test10",
          "name": "Student Test Example",
          "program_owner": "Google"
        },
        {
          "key": "key_test11",
          "link_id": "test11",
          "name": "Student Test Example",
          "program_owner": "GooglePlex"
        }
      ]
    }
  };


  var list_objects = [];

  var retrieveData = function (postdata) {
    var my_index = postdata.my_index;
    var original_data = list_objects[my_index].data;
    var temp_data = original_data;

    // Process search filter
    if (postdata._search) {
      // Process advanced search filter if present
      if (postdata.searchField !== undefined && postdata.searchField !== "") {
        var searches = {
          "eq": { // equals
            method: "equals",
            not: false
          },
          "ne": { // not equals
            method: "equals",
            not: true
          },
          "lt": { // less
            method: "less",
            not: false
          },
          "le": { // less or equal
            method: "lessEquals",
            not: false
          },
          "gt": { // greater
            method: "greater",
            not: false
          },
          "ge": { // greater or equal
            method: "greaterEquals",
            not: false
          },
          "bw": { // begins with
            method: "startsWith",
            not: false
          },
          "bn": { // does not begins with
            method: "startsWith",
            not: true
          },
          "ew": { // ends with
            method: "endsWith",
            not: false
          },
          "en": { // does not end with
            method: "endsWith",
            not: true
          },
          "cn": { // contains
            method: "contains",
            not: false
          },
          "nc": { // does not contain
            method: "contains",
            not: true
          }
        };
        // just because I don't know what to use for in and is not in, skipping
        if (postdata.searchOper !== "in" || postdata.searchOper !== "ni") {
          if (searches[postdata.searchOper].not) {
            temp_data = jLinq.from(temp_data).not()[searches[postdata.searchOper].method](postdata.searchField, postdata.searchString).select();
          }
          else {
            temp_data = jLinq.from(temp_data)[searches[postdata.searchOper].method](postdata.searchField, postdata.searchString).select();
          }
        }
      }
      // otherwise process simple filter
      else if (original_data[0] !== undefined) {
        jQuery.each(original_data[0], function (element_key, element_value) {
          if (postdata[element_key] !== undefined) {
            temp_data = jLinq.from(temp_data).contains(element_key, postdata[element_key]).select();
          }
        });
      }
    }

    // Process index/sorting filters
    var sort_column = postdata.sidx;
    var order_type = postdata.sord;
    if (order_type === "asc") {
      order_type = "";
    }
    else {
      order_type = "-";
    }

    temp_data = jLinq.from(temp_data).orderBy(order_type + sort_column).select();

    var offset_start = (postdata.page - 1) * postdata.rows;
    var offset_end = (postdata.page * postdata.rows) - 1;
    var json_to_return = {
      "page": postdata.page,
      "total": temp_data.length === 0 ? 0 : Math.ceil(temp_data.length / postdata.rows),
      "records": temp_data.length,
      "rows": []
    };
    for (var i = offset_start; i <= offset_end; i++) {
      if (temp_data[i] === undefined) {
        continue;
      }
      var my_cell = [];
      if (original_data[0] !== undefined) {
          jQuery.each(list_objects[my_index].configuration.colModel, function (element_key, element_value) {
            my_cell.push(temp_data[i][element_value.name]);
          });
      }

      json_to_return.rows.push({
        "key": temp_data[i].key,
        "cell": my_cell
      });
    }

    var thegrid = jQuery("#" + list_objects[my_index].jqgrid.id)[0];
    thegrid.addJSONData(json_to_return);
  };


  var default_jqgrid_options = {
    datatype: retrieveData,
    viewrecords: true
  };

  var default_pager_options = {
    edit: false,
    add: false,
    del: false
  };

  $m.loadList = function (div, idx) {
    idx = parseInt(idx, 10);
    if (isNaN(idx) || idx < 0) {
      throw new melange.error.listIndexNotValid("List index " + idx + " is not valid");
    }
    if (list_objects[idx]) {
      throw new melange.error.indexAlreadyExistent("Index " + idx + " is already existent");
    } else {
      list_objects[idx] = {};
    }
    jQuery(
      function () {
        if (jQuery("#" + div).length === 0) {
          throw new melange.error.divNotExistent("Div " + div + " is not existent");
        }
        list_objects[idx] = (
          function () {
            var start = "";
            list_objects[idx].data = [];
            //create jqgrid object
            var initial_div = jQuery("#" + div);
            var table_id = "jqgrid_" + div;
            var pager_id = "jqgrid_pager_" + div;
            initial_div.replaceWith([
              '<table id="' + table_id + '"',
              ' cellpadding="0" cellspacing="0"',
              '></table>',
              '<div id="' + pager_id + '"',
              ' style="text-align:center"',
              '></div>'
            ].join(""));

            list_objects[idx].jqgrid = {};
            list_objects[idx].jqgrid.id = table_id;
            /* This passage is necessary because otherwise default_jqgrid_options
               has side effect over the configuration of single tables
               e.g.: pager div name is always the last one
            */
            var cloned_options = jQuery.extend({}, default_jqgrid_options);
            list_objects[idx].jqgrid.options =
              jQuery.extend(cloned_options, {pager: jQuery("#" + pager_id)});
            list_objects[idx].pager = {};
            list_objects[idx].pager.id = pager_id;
            list_objects[idx].pager.options = default_pager_options;

            var looping = function () {
              jQuery.ajax({
                async: false,
                cache: false,
                url: [
                  window.location.href,
                  "?fmt=json&count=50",
                  (start === "" ? "" : "&start=" + start),
                  "&idx=", idx
                ].join(""),
                timeout: 10000,
                success: function (data) {
                  jQuery("#" + div).html("List number " + idx + " loaded");
                  //console.debug("I'm idx "+idx+" with start "+start);
                  if (dummy_source[idx].data[start] !== undefined) {
                    //console.debug("data present, including");
                    list_objects[idx].configuration = dummy_source[idx].configuration;
                    var my_data = dummy_source[idx].data[start];
                    jQuery.each(my_data, function () {
                      list_objects[idx].data.push(this);
                    });

                    //if jqGrid is not present, create it
                    if (list_objects[idx].jqgrid.object === undefined) {
                      var extended_config = list_objects[idx].configuration || {};
                      //giving index of the table in post data
                      jQuery.extend(extended_config, {postData: {my_index: idx}});

                      var table_id = list_objects[idx].jqgrid.id;
                      var jqgrid_options = list_objects[idx].jqgrid.options;

                      var pager_id = list_objects[idx].pager.id;
                      var pager_options = list_objects[idx].pager.options;

                      var button_showhide_options = {
                        caption: "",
                        buttonicon: "ui-icon-calculator",
                        onClickButton: function () {
                          jQuery("#" + table_id).setColumns({
                            colnameview: false,
                            jqModal: true,
                            ShrinkToFit: true
                          });
                          return false;
                        },
                        position: "last",
                        title: "Show/Hide Columns",
                        cursor: "pointer"
                      };

                      jQuery("#" + table_id)
                        .jqGrid(
                          jQuery.extend(jqgrid_options, extended_config)
                        )
                        .jqGrid(
                          // show pager
                          "navGrid",
                          "#" + pager_id,
                          pager_options
                        ).jqGrid(
                          // show button to hide/show columns
                          "navButtonAdd",
                          "#" + pager_id,
                          button_showhide_options
                        );
                      jQuery("#" + table_id).jqGrid('filterToolbar', {});
                      list_objects[idx].jqgrid.object = jQuery("#" + table_id);
                    }
                    else {
                      //else trigger new data in jqgrid object
                      list_objects[idx].jqgrid.object.trigger("reloadGrid");
                    }
                    //call next iteration
                    start = my_data[(my_data.length - 1)].key;
                    setTimeout(looping, 100);
                  }
                  else {
                    //can call a callback if needed
                    //console.debug("void, skipping");
                  }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                  jQuery("#" + div).html("Error retrieving list number " + idx);
                }
              });
            };
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
       //console.debug("callback called for index "+idx);
       //console.dir(list_objects[idx]["data"]);
    }
  };
}());
