this["JST"] = this["JST"] || {};

this["JST"]["_templates/button-item.hjs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<button type="button" class="btn btn-default" data-name="' +
__e( fieldName ) +
'" data-value="' +
__e( _id ) +
'">' +
__e( name ) +
'</button>';

}
return __p
};

this["JST"]["_templates/checkbox.hjs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<input type="checkbox" name="' +
__e( fieldName ) +
'" value="' +
__e( _id ) +
'">\n' +
__e( name );

}
return __p
};

this["JST"]["_templates/message.hjs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="list-group-item-text">\n<p class="small text-muted">\n<time datetime="' +
__e( created ) +
'">' +
__e( asapp.date(created) ) +
'</time>\nby ' +
__e( user.username ) +
'\n</p>\n' +
__e( text ) +
'\n</div>';

}
return __p
};

this["JST"]["_templates/radio-item.hjs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<input type="radio" name="' +
__e( fieldName ) +
'" value="' +
__e( _id ) +
'">\n' +
__e( name );

}
return __p
};

this["JST"]["_templates/request.hjs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="caption">\n<div class="pull-right">\n';
 if (urgent) { ;
__p += '\n<span class="label label-danger">Urgent</span>\n';
 } else { ;
__p += '\n<span class="label label-info">FYI</span>\n';
 } ;
__p += '\n</div>\n<small>\n<strong><time datetime="' +
__e( created ) +
'">' +
__e( asapp.date(created) ) +
'</time></strong>\nby <strong>' +
__e( user.username ) +
'</strong>\nin <strong>' +
__e( location.name ) +
'</strong>\nabout <strong>' +
__e( group.name ) +
'</strong>\n</small>\n<p>\n' +
__e( description ) +
'\n</p>\n<div class="btn-toolbar">\n<div class="btn-group">\n<a href="#chat/' +
__e( _id ) +
'" class="btn btn-default btn-chat">Discuss</a>\n</div>\n<div class="statuses"></div>\n</div>\n</div>';

}
return __p
};

this["JST"]["_templates/statuses.hjs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<select class="selectpicker" data-width="auto">\n';
 if (urgent) { ;
__p += '\n<option>I\'m on it</option>\n<option>Closed</option>\n';
 } else { ;
__p += '\n<option>10-4</option>\n<option>Closed</option>\n';
 } ;
__p += '\n</select>';

}
return __p
};

this["JST"]["_templates/wilcos.hjs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<!-- <div class="col-sm-1">\n<div class="thumbnail">\n<div class="caption">\n<small>\n' +
__e( username ) +
'\n</small>\n</div>\n</div>\n</div> -->\n<span class="label label-success">' +
__e( username ) +
'</span>';

}
return __p
};