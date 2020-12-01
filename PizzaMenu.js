
			(function() {
        
				// format val to the n number of decimal places
				function formatDecimal(val, n) {
					n = n || 2;
					var str = "" + Math.round ( parseFloat(val) * Math.pow(10, n) );
					while (str.length <= n) {
						str = "0" + str;
					}
					var pt = str.length - n;
					return str.slice(0,pt) + "." + str.slice(pt);
				}
				
				function getRadioVal(form, name) {
					var radios = form.elements[name];
					var val;
					
					for (var i=0, len=radios.length; i<len; i++) {
						if ( radios[i].checked == true ) {
							val = radios[i].value;
							break;
						}
						
            	
					}
					return val;
				}

				 //cool jquery function to store the names get the names of checked id
				$("#buttonClass").on("click", function() {
					var checkedIds = $(".check:checked").map(function() {
					  return this.id;
					
					}).toArray();
					(checkedIds.join(", "));
	
					localStorage.setItem("names",checkedIds);
	
				  });


				function getToppingsTotal(e) {
					var form = this.form;
					var val = parseFloat( form.elements['tops_tot'].value );
					
					if ( this.checked == true ) {
						val += parseFloat(this.value);
					} else {
						val -= parseFloat(this.value);
					}
					
					form.elements['tops_tot'].value = formatDecimal(val);
					updatePizzaTotal(form);
				}
				
				function getSizePrice(e) {
					this.form.elements['sz_tot'].value = parseFloat( this.value );
					updatePizzaTotal(this.form);
				}
	
				function updatePizzaTotal(form) {
					var sz_tot = parseFloat( form.elements['sz_tot'].value );
					var tops_tot = parseFloat( form.elements['tops_tot'].value );
					form.elements['total'].value = formatDecimal( sz_tot + tops_tot );
 
					localStorage.setItem("SizeCost",sz_tot);
					localStorage.setItem("ToppingsCost",tops_tot);
					localStorage.setItem("TotalCost", sz_tot + tops_tot );
				}
			
				
				var form = document.getElementById('pizzaForm');
			
				var el = document.getElementById('pizza_toppings');
			
				// input in toppings container element
				var tops = el.getElementsByTagName('input');
			
				for (var i=0, len=tops.length; i<len; i++) {
					if ( tops[i].type === 'checkbox' ) {
						tops[i].onclick = getToppingsTotal;
					}
				}
				var sz = form.elements['size'];
				
				for (var i=0, len=sz.length; i<len; i++) {
					sz[i].onclick = getSizePrice;
				}
				
				// set sz_tot to value of selected
				form.elements['sz_tot'].value = formatDecimal( parseFloat( getRadioVal(form, 'size') ) );
				updatePizzaTotal(form);
				
				
			}());
			  
	