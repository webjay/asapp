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

this["JST"]["_templates/message.hjs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<td>\n<time datetime="' +
__e( created ) +
'">' +
__e( asapp.date(created) ) +
'</time>\n</td>\n<td>' +
__e( user.username ) +
'</td>\n<td>' +
__e( text ) +
'</td>';

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
__p += '<div class="thumbnail">\n<div class="caption">\n<small>\n<strong><time datetime="' +
__e( created ) +
'">' +
__e( asapp.date(created) ) +
'</time></strong>\nin <strong>' +
__e( location.name ) +
'</strong>\nby <strong>' +
__e( user.username ) +
'</strong>\nabout <strong>' +
__e( type.name ) +
'</strong>\n</small>\n<p>\n' +
__e( description ) +
'\n</p>\n';
 if (urgent) { ;
__p += '\n<div class="pull-right">\n<span class="label label-danger">Urgent</span>\n</div>\n';
 } ;
__p += '\n<div class="btn-toolbar">\n<div class="btn-group btn-group-xs">\n<a href="#chat" class="btn btn-info">Discuss</a>\n</div>\n</div>\n</div>\n</div>';

}
return __p
};

this["JST"]["_templates/statuses.hjs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">\n' +
__e( status ) +
'\n<span class="caret"></span>\n</button>\n<ul class="dropdown-menu" role="menu">\n';
 _.each(statuses, function (status) { ;
__p += '\n<li><a href="#" data-id="' +
__e( status._id ) +
'">' +
__e( status.name ) +
'</a></li>\n';
 }); ;
__p += '\n</ul>';

}
return __p
};