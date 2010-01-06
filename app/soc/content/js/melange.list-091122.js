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
      "colNames": ['yo"Key', "Link, ID", "Name", "Program Owner"],
      "colModel": [
        {name: "key", index: "key", resizable: true, hidden: true},
        {name: "link_id", index: "link_id", resizable: true, hidden: true},
        {name: "name", index: "name", resizable: true},
        {name: "program_owner", index: "program_owner", resizable: true}
      ],
      rowNum: 4,
      rowList: [4, 8],
      autowidth: true,
      sortname: "link_id",
      sortorder: "asc",
      height: "auto",
      toolbar: [true, "top"]
    },
    "data": {
      "": [
        {
          "columns": {
            "key": "key_test",
            "link_id": "test",
            "name": "Test Example",
            "program_owner": "Google"
          },
          "operations": {
            "add": {
              "caption": "Add a user",
              "link": "http://add1",
              "new_window": true
            },
            "edit": {
              "caption": "Edit a user",
              "link": "http://edit1",
              "new_window": false
            },
            "delete": {
              "caption": "Delete a User",
              "link": "http://delete1",
              "new_window": true
            }
          }
        },
        {
          "columns": {
            "key": "key_test2",
            "link_id": "test2",
            "name": "Test Example",
            "program_owner": "GooglePlex"
          },
          "operations": {
            "add": {
              "caption": "Add a user",
              "link": "http://add2",
              "new_window": true
            },
            "edit": {
              "caption": "Edit a user",
              "link": "http://edit2",
              "new_window": true
            },
            "delete": {
              "caption": "Delete a User",
              "link": "http://delete2",
              "new_window": true
            }
          }
        }
      ],
      "key_test2": [
        {
          "columns": {
            "key": "key_test2bis",
            "link_id": "test2bis",
            "name": "Test Example Loaded Incrementally",
            "program_owner": "Google"
          },
          "operations": {
            "add": {
              "caption": "Add a user",
              "link": "http://add",
              "new_window": true
            },
            "edit": {
              "caption": "Edit a user",
              "link": "http://edit",
              "new_window": true
            },
            "delete": {
              "caption": "Delete a User",
              "link": "http://delete",
              "new_window": true
            }
          }
        },
        {
          "columns": {
            "key": "key_test2tris",
            "link_id": "test2tris",
            "name": "Test Example Loaded Incrementally",
            "program_owner": "GooglePlex"
          },
          "operations": {
            "add": {
              "caption": "Add a user",
              "link": "http://add",
              "new_window": true
            },
            "edit": {
              "caption": "Edit a user",
              "link": "http://edit",
              "new_window": true
            },
            "delete": {
              "caption": "Delete a User",
              "link": "http://delete",
              "new_window": true
            }
          }
        },
        {
          "columns": {
            "key": "key_2ndpage",
            "link_id": "test2ndpage",
            "name": "Test Example 2nd page",
            "program_owner": "Google"
          },
          "operations": {
            "add": {
              "caption": "Add a user",
              "link": "http://add",
              "new_window": true
            },
            "edit": {
              "caption": "Edit a user",
              "link": "http://edit",
              "new_window": true
            },
            "delete": {
              "caption": "Delete a User",
              "link": "http://delete",
              "new_window": true
            }
          }
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
      sortorder: "asc",
      toolbar: [true, "top"]
    },
    "data": {
      "": [
        {
          "columns": {
            "key": "key_test3",
            "link_id": "test3",
            "name": "Mentor Test Example",
            "program_owner": "melange"
          },
          "operations": {
            "add": {
              "caption": "Add a user",
              "link": "http://add",
              "new_window": true
            },
            "edit": {
              "caption": "Edit a user",
              "link": "http://edit",
              "new_window": true
            },
            "delete": {
              "caption": "Delete a User",
              "link": "http://delete",
              "new_window": true
            }
          }
        },
        {
          "columns": {
            "key": "key_test4",
            "link_id": "test4",
            "name": "Mentor Test Example",
            "program_owner": "google1"
          },
          "operations": {
            "add": {
              "caption": "Add a user",
              "link": "http://add",
              "new_window": true
            },
            "edit": {
              "caption": "Edit a user",
              "link": "http://edit",
              "new_window": true
            },
            "delete": {
              "caption": "Delete a User",
              "link": "http://delete",
              "new_window": true
            }
          }
        }
      ],
      "key_test4": [
        {
          "columns": {
            "key": "key_test5",
            "link_id": "test5",
            "name": "Mentor Test Example Loaded Incrementally",
            "program_owner": "google1"
          },
          "operations": {
            "add": {
              "caption": "Add a user",
              "link": "http://add",
              "new_window": true
            },
            "edit": {
              "caption": "Edit a user",
              "link": "http://edit",
              "new_window": true
            },
            "delete": {
              "caption": "Delete a User",
              "link": "http://delete",
              "new_window": true
            }
          }
        }
      ],
      "key_test5": [
        {
          "columns": {
            "key": "key_test6",
            "link_id": "test6",
            "name": "Mentor Test Example Loaded Incrementally 2",
            "program_owner": "google1"
          },
          "operations": {
            "add": {
              "caption": "Add a user",
              "link": "http://add",
              "new_window": true
            },
            "edit": {
              "caption": "Edit a user",
              "link": "http://edit",
              "new_window": true
            },
            "delete": {
              "caption": "Delete a User",
              "link": "http://delete",
              "new_window": true
            }
          }
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
      sortorder: "asc",
      toolbar: [true, "top"]
    },
    "data": {
      "": [
        {
          "columns": {
            "key": "key_test7",
            "link_id": "test7",
            "name": "Admin Test Example",
            "program_owner": "melange"
          },
          "operations": {
            "add": {
              "caption": "Add a user",
              "link": "http://add",
              "new_window": true
            },
            "edit": {
              "caption": "Edit a user",
              "link": "http://edit",
              "new_window": true
            },
            "delete": {
              "caption": "Delete a User",
              "link": "http://delete",
              "new_window": true
            }
          }
        },
        {
          "columns": {
            "key": "key_test8",
            "link_id": "test8",
            "name": "Admin Test Example",
            "program_owner": "google1"
          },
          "operations": {
            "add": {
              "caption": "Add a user",
              "link": "http://add",
              "new_window": true
            },
            "edit": {
              "caption": "Edit a user",
              "link": "http://edit",
              "new_window": true
            },
            "delete": {
              "caption": "Delete a User",
              "link": "http://delete",
              "new_window": true
            }
          }
        }
      ],
      "key_test8": [
        {
          "columns": {
            "key": "key_test9",
            "link_id": "test9",
            "name": "Admin Test Example Loaded Incrementally",
            "program_owner": "google1"
          },
          "operations": {
            "add": {
              "caption": "Add a user",
              "link": "http://add",
              "new_window": true
            },
            "edit": {
              "caption": "Edit a user",
              "link": "http://edit",
              "new_window": true
            },
            "delete": {
              "caption": "Delete a User",
              "link": "http://delete",
              "new_window": true
            }
          }
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
      sortorder: "asc",
      toolbar: [true, "top"]
    },
    "data": {
      "": [
        {
          "columns": {
            "key": "key_test10",
            "link_id": "test10",
            "name": "Student Test Example",
            "program_owner": "Google"
          },
          "operations": {
            "add": {
              "caption": "Add a user",
              "link": "http://add",
              "new_window": true
            },
            "edit": {
              "caption": "Edit a user",
              "link": "http://edit",
              "new_window": true
            },
            "delete": {
              "caption": "Delete a User",
              "link": "http://delete",
              "new_window": true
            }
          }
        },
        {
          "columns": {
            "key": "key_test11",
            "link_id": "test11",
            "name": "Student Test Example",
            "program_owner": "GooglePlex"
          },
          "operations": {
            "add": {
              "caption": "Add a user",
              "link": "http://add",
              "new_window": true
            },
            "edit": {
              "caption": "Edit a user",
              "link": "http://edit",
              "new_window": true
            },
            "delete": {
              "caption": "Delete a User",
              "link": "http://delete",
              "new_window": true
            }
          }
        }
      ]
    }
  };


  var list_objects = [];

  var retrieveData = function (postdata) {
    var my_index = postdata.my_index;
    var original_data = list_objects[my_index].data;
    var temp_data = original_data;
    var group_operation = "";
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
      },
      "in": {
        method: "match",
        not: false
      },
      "ni": {
        method: "match",
        not: true
      }
    };

    // Process search filter
    if (postdata._search && postdata.filters) {
      var filters = JSON.parse(postdata.filters);
      if (filters.rules[0].data !== "") {
        group_operation = filters.groupOp;
        if (group_operation === "OR") {
          temp_data = {};
        }
        jQuery.each(filters.rules, function (arr_index, filter) {
          if (filter.op === "in" || filter.op === "ni") {
            filter.data = filter.data.split(",").join("|");
          }
          if (searches[filter.op].not) {
            if (group_operation === "OR") {
              temp_data = jLinq.from(temp_data).union(jLinq.from(original_data).not()[searches[filter.op].method](filter.field, filter.data).select()).select();
            }
            else {
              temp_data = jLinq.from(temp_data).not()[searches[filter.op].method](filter.field, filter.data).select();
            }
          }
          else {
            if (group_operation === "OR") {
              temp_data = jLinq.from(temp_data).union(jLinq.from(original_data)[searches[filter.op].method](filter.field, filter.data).select()).select();
            }
            else {
              temp_data = jLinq.from(temp_data)[searches[filter.op].method](filter.field, filter.data).select();
            }
          }
        });
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
    list_objects[my_index].filtered_data = temp_data;

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
            list_objects[idx].all_data = [];
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
            list_objects[idx].jqgrid.options.onSelectRow = function (row_number) {
              var row = jQuery("#" + list_objects[idx].jqgrid.id).jqGrid('getRowData',row_number);
              var object = jLinq.from(list_objects[idx].all_data).equals("columns.key",row.key).select()[0];
              jQuery.each(object.operations, function (operation_name, operation_object) {
                var new_location = operation_object.new_window ? 'window.open("' + operation_object.link + '")' : 'window.location.href = "' + operation_object.link + '"';
                jQuery("#" + list_objects[idx].jqgrid.id + "_buttonOp_" + operation_name).remove();
                jQuery("#t_" + list_objects[idx].jqgrid.id).append("<input type='button' value='" + operation_object.caption + "' style='float:left' id='" + list_objects[idx].jqgrid.id +"_buttonOp_" + operation_name + "' onclick = '" + new_location + "'/>");
              });
            }

            list_objects[idx].pager = {};
            list_objects[idx].pager.id = pager_id;
            list_objects[idx].pager.options = default_pager_options;

            var looping = function () {
              jQuery.ajax({
                async: true,
                cache: false,
                url: [
                  window.location.href,
                  "?fmt=json&limit=250",
                  (start === "" ? "" : "&start=" + start),
                  "&idx=", idx
                ].join(""),
                timeout: 10000,
                success: function (data) {
                  jQuery("#" + div).html("List number " + idx + " loaded");
                  //console.debug("I'm idx "+idx+" with start "+start);
                  var source;
                  try {
                    source = JSON.parse(data);
                  }
                  catch (SyntaxError) {
                    source = dummy_source[idx];
                  }
                  if (source.data[start] !== undefined && source.data[start].length) {
                    //console.debug("data present, including");
                    if (list_objects[idx].configuration === undefined) {
                      list_objects[idx].configuration = source.configuration;
                    }
                    var my_data = source.data[start];
                    jQuery.each(my_data, function () {
                      list_objects[idx].data.push(this.columns);
                      list_objects[idx].all_data.push(this);
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
                          pager_options,
                          {}, // settings for edit
                          {}, // settings for add
                          {}, // settings for delete
                          {
                            closeAfterSearch: true,
                            multipleSearch: true
                          },
                          {} // view parameters
                        ).jqGrid(
                          // show button to hide/show columns
                          "navButtonAdd",
                          "#" + pager_id,
                          button_showhide_options
                        );
                      jQuery("#" + table_id).jqGrid('filterToolbar', {});

                      // Show Loading message
                      jQuery("#load_"+table_id).show();

                      list_objects[idx].jqgrid.object = jQuery("#" + table_id);
                    }
                    else {
                      //else trigger new data in jqgrid object
                      list_objects[idx].jqgrid.object.trigger("reloadGrid");
                    }
                    //call next iteration
                    if (my_data[(my_data.length- 1)] !== undefined) {
                      start = my_data[(my_data.length - 1)].columns.key;
                      setTimeout(looping, 100);
                    }
                  }
                  else {
                    //can call a callback if needed

                    //loading data finished, hiding loading message
                    jQuery("#load_" + list_objects[idx].jqgrid.id).hide();

                    //Add CSV Export button only once all data is loaded

                    //Add some padding at the bottom of the toolbar to display buttons correctly
                    jQuery("#t_" + list_objects[idx].jqgrid.id).css("padding-bottom","3px");
                    //Add CSV export button
                    jQuery("#t_" + list_objects[idx].jqgrid.id).append("<input type='button' value='CSV Export' style='float:right' id='csvexport_" + list_objects[idx].jqgrid.id + "'/>");
                    //Add Click event to CSV export button
                    jQuery("#csvexport_" + list_objects[idx].jqgrid.id).click(function () {
                      var csv_export = [];
                      csv_export[0] = [];
                      //get Columns names
                      if (list_objects[idx].data[0] !== undefined || list_objects[idx].filtered_data[0] !== undefined) {
                        var iterate_through = list_objects[idx].filtered_data || list_objects[idx].data;
                        jQuery.each(list_objects[idx].configuration.colNames, function (column_index, column_name) {
                          // check index for column name
                          var field_text = column_name;
                          if (field_text.indexOf("\"") !== -1) {
                            field_text = field_text.replace("\"","\"\"");
                          }
                          if (field_text.indexOf(",") !== -1 || field_text.indexOf("\"") !== -1 || field_text.indexOf("\r\n") !== -1) {
                            field_text = "\"" + field_text + "\"";
                          }
                          csv_export[0].push(field_text);
                        });
                        csv_export[0] = csv_export[0].join(",");

                        //now run through the columns
                        jQuery.each(iterate_through, function (row_index, row) {
                          csv_export[csv_export.length] = [];
                          jQuery.each(row, function (column_name, cell_value) {
                            var field_text = cell_value;
                            if (field_text.indexOf("\"") !== -1) {
                              field_text = field_text.replace("\"","\"\"");
                            }
                            if (field_text.indexOf(",") !== -1 || field_text.indexOf("\"") !== -1 || field_text.indexOf("\r\n") !== -1) {
                              field_text = "\"" + field_text + "\"";
                            }
                            csv_export[csv_export.length - 1].push(field_text);
                          });
                          csv_export[csv_export.length - 1] = csv_export[csv_export.length - 1].join(",");
                        });
                        csv_export = csv_export.join("\r\n");
                        //CSV string is there, now put it in a thickbox for the user to copy/paste
                        jQuery("#csv_thickbox").remove();
                        jQuery("body").append("<div id='csv_thickbox' style='display:none'><h3>Now you can copy and paste CSV data from the text area to a new file:</h3><textarea style='width:450px;height:250px'>"+csv_export+"</textarea></div>");
                      tb_show("CSV export","#TB_inline?height=400&width=500&inlineId=csv_thickbox");
                      }
                    });
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
              100
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
