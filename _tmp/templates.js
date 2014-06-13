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
__p += '<input type="radio" name="' +
__e( fieldName ) +
'" value="' +
__e( _id ) +
'" id="' +
((__t = ( uid )) == null ? '' : __t) +
'">\n' +
__e( name );

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
'</td>\n<td><a href="#chat" class="ui-btn ui-btn-inline">Chat</a></td>';

}
return __p
};

this["JST"]["_templates/statuses.hjs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<fieldset data-role="controlgroup" data-type="horizontal" data-mini="true"></fieldset>';

}
return __p
};