this["JST"] = this["JST"] || {};

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
__p += '<!-- <div class="radio"> -->\n<label class="radio-inline">\n<input type="radio" name="' +
__e( fieldName ) +
'" value="' +
__e( _id ) +
'">\n' +
__e( name ) +
'\n</label>\n<!-- </div> -->';

}
return __p
};

this["JST"]["_templates/request.hjs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<td>\n<time datetime="' +
__e( created ) +
'">' +
__e( asapp.date(created) ) +
'</time>\n</td>\n<td>' +
__e( location.name ) +
'</td>\n<td>' +
__e( user.username ) +
'</td>\n<td>' +
__e( type.name ) +
'</td>\n<td>' +
__e( description ) +
'</td>\n<td>\n<a href="#chat" class="btn btn-info gotoChat">Chat</a>\n</td>';

}
return __p
};

this["JST"]["_templates/statuses.hjs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<fieldset></fieldset>';

}
return __p
};