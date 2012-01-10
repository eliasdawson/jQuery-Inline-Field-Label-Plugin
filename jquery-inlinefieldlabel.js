/*
 * jQuery Inline Field Label Plugin v1.0
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
			var tempPasswordField,
				label = $( this ),
				field = $( document.getElementById( label.attr( "for" ) ) );
			
			//Only run if for attribute is present and a valid ID
			if ( field.length ) {
				
				//Hide <label> element
				label.hide();
				
				//Text field
				if ( field.is( "textarea" ) || field.attr( "type" ) === "text" ) {
					//Set input element value and add CSS class
					field.val( label.text() ).addClass( config.cssClass );
					
					//Bind focus and blur events
					field.focus(function() {
						if ( field.val() === label.text() ) {
							field.val( "" ).removeClass( config.cssClass );
						}
					}).blur(function() {
						if ( field.val() === "" ) {
							field.val( label.text() ).addClass( config.cssClass );
						}
					});
				}
				//Password field
				else if ( field.attr( "type" ) === "password" ) {
					//Create input element to simulate plain text password field
					tempPasswordField = $( "<input>" ).attr( "type", "text" ).addClass( field.attr( "class" ) );
					tempPasswordField.val( label.text() ).addClass( config.cssClass );
					
					//Add element to DOM
					field.hide();
					tempPasswordField.insertBefore( field );
					
					//Bind focus and blur events
					tempPasswordField.focus(function() {
						tempPasswordField.hide();
						field.show().focus();
					});
					
					field.blur(function() {
						if ( field.val() === "" ) {
							tempPasswordField.show();
							field.hide();
						}
					});
				}
			}
		});

		return this;
	};
}( jQuery ));