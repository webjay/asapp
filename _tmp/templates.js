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
'</strong>\n</small>\n<p>' +
__e( description ) +
'</p>\n<p>' +
((__t = ( wilcos )) == null ? '' : __t) +
'</p>\n<div class="btn-toolbar">\n<div class="btn-group">\n<a href="#chat/' +
__e( _id ) +
'" class="btn btn-default btn-chat">Discuss</a>\n</div>\n' +
((__t = ( statuses )) == null ? '' : __t) +
'\n</div>\n</div>';

}
return __p
};

this["JST"]["_templates/wilcos.hjs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="small">\n<span class="text-muted">\nAcknowledgements\n<span class="badge">' +
((__t = ( usernames.length )) == null ? '' : __t) +
'</span>\n</span>\n';
 for (var i = usernames.length - 1; i >= 0; i--) { ;
__p += '\n<strong>' +
__e( usernames[i] ) +
'</strong>';
 if (i > 0) { ;
__p += ', ';
 } ;
__p += '\n';
 } ;
__p += '\n</div>';

}
return __p
};