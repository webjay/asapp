+function($){"use strict";var Button=function(element,options){this.$element=$(element);this.options=$.extend({},Button.DEFAULTS,options);this.isLoading=false};Button.VERSION="3.2.0";Button.DEFAULTS={loadingText:"loading..."};Button.prototype.setState=function(state){var d="disabled";var $el=this.$element;var val=$el.is("input")?"val":"html";var data=$el.data();state=state+"Text";if(data.resetText==null)$el.data("resetText",$el[val]());$el[val](data[state]==null?this.options[state]:data[state]);setTimeout($.proxy(function(){if(state=="loadingText"){this.isLoading=true;$el.addClass(d).attr(d,d)}else if(this.isLoading){this.isLoading=false;$el.removeClass(d).removeAttr(d)}},this),0)};Button.prototype.toggle=function(){var changed=true;var $parent=this.$element.closest('[data-toggle="buttons"]');if($parent.length){var $input=this.$element.find("input");if($input.prop("type")=="radio"){if($input.prop("checked")&&this.$element.hasClass("active"))changed=false;else $parent.find(".active").removeClass("active")}if(changed)$input.prop("checked",!this.$element.hasClass("active")).trigger("change")}if(changed)this.$element.toggleClass("active")};function Plugin(option){return this.each(function(){var $this=$(this);var data=$this.data("bs.button");var options=typeof option=="object"&&option;if(!data)$this.data("bs.button",data=new Button(this,options));if(option=="toggle")data.toggle();else if(option)data.setState(option)})}var old=$.fn.button;$.fn.button=Plugin;$.fn.button.Constructor=Button;$.fn.button.noConflict=function(){$.fn.button=old;return this};$(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(e){var $btn=$(e.target);if(!$btn.hasClass("btn"))$btn=$btn.closest(".btn");Plugin.call($btn,"toggle");e.preventDefault()})}(jQuery);+function($){"use strict";var backdrop=".dropdown-backdrop";var toggle='[data-toggle="dropdown"]';var Dropdown=function(element){$(element).on("click.bs.dropdown",this.toggle)};Dropdown.VERSION="3.2.0";Dropdown.prototype.toggle=function(e){var $this=$(this);if($this.is(".disabled, :disabled"))return;var $parent=getParent($this);var isActive=$parent.hasClass("open");clearMenus();if(!isActive){if("ontouchstart"in document.documentElement&&!$parent.closest(".navbar-nav").length){$('<div class="dropdown-backdrop"/>').insertAfter($(this)).on("click",clearMenus)}var relatedTarget={relatedTarget:this};$parent.trigger(e=$.Event("show.bs.dropdown",relatedTarget));if(e.isDefaultPrevented())return;$this.trigger("focus");$parent.toggleClass("open").trigger("shown.bs.dropdown",relatedTarget)}return false};Dropdown.prototype.keydown=function(e){if(!/(38|40|27)/.test(e.keyCode))return;var $this=$(this);e.preventDefault();e.stopPropagation();if($this.is(".disabled, :disabled"))return;var $parent=getParent($this);var isActive=$parent.hasClass("open");if(!isActive||isActive&&e.keyCode==27){if(e.which==27)$parent.find(toggle).trigger("focus");return $this.trigger("click")}var desc=" li:not(.divider):visible a";var $items=$parent.find('[role="menu"]'+desc+', [role="listbox"]'+desc);if(!$items.length)return;var index=$items.index($items.filter(":focus"));if(e.keyCode==38&&index>0)index--;if(e.keyCode==40&&index<$items.length-1)index++;if(!~index)index=0;$items.eq(index).trigger("focus")};function clearMenus(e){if(e&&e.which===3)return;$(backdrop).remove();$(toggle).each(function(){var $parent=getParent($(this));var relatedTarget={relatedTarget:this};if(!$parent.hasClass("open"))return;$parent.trigger(e=$.Event("hide.bs.dropdown",relatedTarget));if(e.isDefaultPrevented())return;$parent.removeClass("open").trigger("hidden.bs.dropdown",relatedTarget)})}function getParent($this){var selector=$this.attr("data-target");if(!selector){selector=$this.attr("href");selector=selector&&/#[A-Za-z]/.test(selector)&&selector.replace(/.*(?=#[^\s]*$)/,"")}var $parent=selector&&$(selector);return $parent&&$parent.length?$parent:$this.parent()}function Plugin(option){return this.each(function(){var $this=$(this);var data=$this.data("bs.dropdown");if(!data)$this.data("bs.dropdown",data=new Dropdown(this));if(typeof option=="string")data[option].call($this)})}var old=$.fn.dropdown;$.fn.dropdown=Plugin;$.fn.dropdown.Constructor=Dropdown;$.fn.dropdown.noConflict=function(){$.fn.dropdown=old;return this};$(document).on("click.bs.dropdown.data-api",clearMenus).on("click.bs.dropdown.data-api",".dropdown form",function(e){e.stopPropagation()}).on("click.bs.dropdown.data-api",toggle,Dropdown.prototype.toggle).on("keydown.bs.dropdown.data-api",toggle+', [role="menu"], [role="listbox"]',Dropdown.prototype.keydown)}(jQuery);