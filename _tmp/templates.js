this["JST"] = this["JST"] || {};

this["JST"]["_templates/monitor-item.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<td>' +
__e( new Date(created).toLocaleDateString() ) +
' ' +
__e( new Date(created).toLocaleTimeString() ) +
'</td><td>' +
__e( location.name ) +
'</td><td>' +
__e( user.username ) +
'</td><td>' +
__e( type.name ) +
'</td><td>' +
__e( description ) +
'</td><td>' +
__e( status.name ) +
'</td>';

}
return __p
};

this["JST"]["_templates/radio-item.jst"] = function(obj) {
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