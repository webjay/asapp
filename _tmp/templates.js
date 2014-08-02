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
'\n</p>\n<p>\n';
 if (owner) { ;
__p += '\n<span class="label label-info">\nOwner: <strong>' +
__e( owner.username ) +
'</strong>\n</span>\n';
 } ;
__p += '\n</p>\n<div class="btn-toolbar">\n<div class="btn-group btn-group-lg">\n<button type="button" class="btn btn-default star" title="Owner" ';
 if (!urgent) { ;
__p += 'disabled';
 } ;
__p += '>\n<span class="glyphicon glyphicon-star"></span>\nI\'m on it\n</button>\n<button type="button" class="btn btn-default wilco" title="Acknowledge" ';
 if (urgent) { ;
__p += 'disabled';
 } ;
__p += '>\n<span class="glyphicon glyphicon-ok"></span>\n10-4\n</button>\n</div>\n<div class="btn-group btn-group-lg">\n<a href="#chat/' +
__e( _id ) +
'" class="btn btn-default btn-chat">Chat</a>\n</div>\n</div>\n</div>';

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