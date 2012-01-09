/*
 * jQuery Inline Field Label Plugin
 *
 * Copyright 2012 Elias Dawson
 * Licensed under the MIT license
 *
 */

(function ( $ ) {
	$.fn.inlineLabel = function ( settings ) {

		/* Configuration */

		var config = {
			//CSS class to add to field when default value is present
			"cssClass": "inlineFieldLabelValue"
		};

		//extend configuration option with passed in settings
		if ( settings ) {
			$.extend( config, settings );
		}

		this.each( function() {
			var label = $( this ),
				fieldID = label.attr( "for" );

			if ( fieldID !== undefined ) {
				var tempPasswordField,
					field = $( "#" + fieldID ),
					isTextField = field.attr( "type" ) === "text",
					isPasswordField = field.attr( "type" ) === "password";
		
				label.hide();
				if ( isTextField ) {
					field.val( label.text() ).addClass( config.cssClass );
				}
				else if ( isPasswordField ) {
					tempPasswordField = $( "<input>" ).attr( "type", "text" ).addClass( field.attr("class") );
					tempPasswordField.val(label.text()).addClass(config.cssClass);
					field.hide();
					tempPasswordField.insertBefore(field);
					tempPasswordField.focus(function() {
						tempPasswordField.hide();
						field.show().focus();
					});
				}

				field.focus(function() {
					if ( isTextField ) {
						if ( field.val() === label.text() ) {
							field.val( "" ).removeClass( config.cssClass );
						}
					}
				}).blur(function() {
					if ( field.val() === "" ) {
						if ( isTextField ) {
							field.val( label.text() ).addClass( config.cssClass );
						}
						else if ( isPasswordField ) {
							tempPasswordField.show();
							field.hide();
						}
					}
				});
			}
		});

		return this;
	};
}( jQuery ));