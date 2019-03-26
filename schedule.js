
let add_bt = document.getElementById('add');
let main_form = document.getElementById('form_box');
add_bt.addEventListener('click',function(){

	let input_div = document.createElement('div');
	input_div.setAttribute('id','input_div');

	let input_ph = document.createTextNode('Title:');
	let input_name = document.createElement('input');
	input_name.setAttribute('id','input_name');
	input_name.setAttribute('title','title');

	let input_c = document.createTextNode('Memo:');
	let input_comment = document.createElement('input');
	input_comment.setAttribute('id','input_comment');
	input_comment.setAttribute('comment','comment');

	let input_del = document.createElement('span');
	input_del.innerHTML = 'x';
	input_del.setAttribute('id','input_del');

	input_del.addEventListener('click',function(){
		input_div.remove();
	});

	input_div.appendChild(input_ph);
	input_div.appendChild(input_name);
	input_div.appendChild(input_c);
	input_div.appendChild(input_comment);
	input_div.appendChild(input_del);

	main_form.appendChild(input_div);
});

let form_submit = document.getElementById('submit');

form_submit.addEventListener('click',function(){
	let main_form_elm = main_form.elements;

	let form_trip = false;
	for(let f=0; f<main_form_elm.length; f+=2){
		let sub_count = 0;
		// console.log(form[f].value);
		for(let w=0; w<main_form_elm.length; w+=2){
			if(main_form_elm[f].value == main_form_elm[w].value){
				// console.log(form[f].value + ' : ' + form[w].value);	
				sub_count+=1;
				if(sub_count>1){
					form_trip = true;
				}
			}
		}
	}

	if(form_trip == true){
		alert('Matching titles found. Cannot Submit');
	}else{
		let data_obj = {};
		let data_obj_str;
		let key;
		let value;

	for(let u=0; u<main_form_elm.length; u++){

		if(main_form_elm[u].hasAttribute('title')){
			key = main_form_elm[u].value;
			key = key.toLowerCase();
			// key = key.replace(/\s+/g, '');
		}

		if(main_form_elm[u].hasAttribute('comment')){
			value = main_form_elm[u].value;
			value = value.toLowerCase();
		}
		data_obj[key] = value;
	}

	// console.log(data_obj);
	data_obj_str = JSON.stringify(data_obj);
	let date2 = new Date();

	let clarify = confirm('Submit Entry?');
	if(clarify === true){
		localStorage.setItem('DIARY' + ' ' + date2,data_obj_str);
		location.reload();
		}
	}
});

	// let special = '~,./\'\][;!@#$%^&*()_+|}{:"?><`¡™£¢∞§¶•ªº–≠«‘“πøˆ¨¥†®´∑œåß∂ƒ©˙∆˚¬…æ÷≥≤µ˜∫√ç≈Ω';
	// // for(let p=0; p<main_form_elm.length; p++){
	// // 	for(let y=0; y<main_form_elm[p].value.length; y++){
	// // 		let val_check = main_form_elm[p].value[y]
	// // 		for(let n=0; n<special.length; n++){
	// // 			if(val_check == special[n]){
	// // 				console.log('special character identified: ' + special[n]);
	// // 			}
	// // 		}
	// // 	}
	// // }

let ls = localStorage;

let diary = 'DIARY';
let days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
let ints = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
let years = [];
for(let time = 2019; time<2021; time++){
	years.push(time);
}

let compare;

let select = document.createElement('select');
select.setAttribute('id','find_sel');

	for(y=0; y<years.length; y++){

		for(m=0; m<months.length; m++){

			for(i=0; i<ints.length; i++){

				for(d=0; d<days.length; d++){

					compare = diary + ' ' + days[d] + ' ' + months[m] + ' ' + ints[i] + ' ' + years[y];

					for(let key in localStorage){

						if(key.includes(compare)){

							// console.log(key);

							let parsed = JSON.parse(ls.getItem(key));

							let everyEntry = document.getElementById('daily');

 							let dailyDiv = document.createElement('div');
 							dailyDiv.setAttribute('id','daily2');

 							everyEntry.appendChild(dailyDiv);

 							let dailyDate = document.createElement('div');
							dailyDate.setAttribute('id','date');

 							dailyDiv.appendChild(dailyDate);

 							let date = document.createTextNode(key);
  							dailyDate.appendChild(date);

  							for(var key2 in parsed){
 								let ind_div = document.createElement('div');
 								ind_div.setAttribute('id','ind_ent');
 								let ind_title = document.createTextNode(key2.toUpperCase() + ': ');
 								let ind_entry = document.createTextNode(parsed[key2]);
 								ind_div.appendChild(ind_title);
 								ind_div.appendChild(ind_entry);
 								dailyDiv.appendChild(ind_div);
 							}

 							let delete_bt = document.createElement('div');
 							delete_bt.setAttribute('id','delete');
 							dailyDiv.appendChild(delete_bt);

 							let d_bt = document.createElement('button');
 							d_bt.setAttribute('id','delete_bt');
 							let d_bt_txt = document.createTextNode('Remove');
 							d_bt.appendChild(d_bt_txt);
 							delete_bt.appendChild(d_bt);

 							delete_bt.addEventListener('click',function(){
 								let check = confirm('Are you sure you want to delete this entry? By confirming you will delete this entry permanently.');
 								if(check == true){
 									localStorage.removeItem(key);
 									location.reload();
 								}
 							});

 							let option = document.createElement('option');
 							let ind_sel = document.createTextNode(key);
 							option.appendChild(ind_sel);
 							select.appendChild(option);




 							let edit_bt_div = document.createElement('div');
 							edit_bt_div.setAttribute('id','edit_bt_div');
 							let edit_bt = document.createElement('button');
 							edit_bt.setAttribute('id','edit_bt');
 							edit_bt.setAttribute('class','edit_class');
 							let edit_txt = document.createTextNode('Edit');
 							edit_bt.appendChild(edit_txt);
 							edit_bt_div.appendChild(edit_bt);
 							dailyDiv.appendChild(edit_bt_div);

 							edit_bt.addEventListener('click',function(){

 								let edit_div = document.createElement('div');
 								edit_div.setAttribute('id','edit_div');
 								dailyDiv.appendChild(edit_div);
 								let bt_find = document.getElementsByClassName('edit_class');
 								for(let f=0; f<bt_find.length; f++){
 									bt_find[f].disabled = true;
 								}
 								
 								let edit_form_div = document.createElement('div');
 								edit_form_div.setAttribute('id','edit_form_div');
 								edit_div.appendChild(edit_form_div);

 								let edit_bt_box = document.createElement('div');
 								edit_bt_box.setAttribute('id','edit_bt_box');

 								let edit_cancel = document.createElement('button');
 								edit_cancel.addEventListener('click',function(){
 									dailyDiv.removeChild(edit_div);
 									let bt_find2 = document.getElementsByClassName('edit_class');
 									for(let g=0; g<bt_find2.length; g++){
 										bt_find2[g].disabled = false;
 									}
 								});

 								let entry_find = localStorage.getItem(key);
 								let entry_parse = JSON.parse(entry_find);
 								// console.log(entry_parse);

 								for(let e in entry_parse){

									let entries_div = document.createElement('div');
 									entries_div.setAttribute('id','entries_div');

 									let entries_title = document.createElement('input');
 									entries_title.setAttribute('id','entries_title');
 									entries_title.setAttribute('name','title');

 									let entries_comment = document.createElement('input');
 									entries_comment.setAttribute('id','entries_comment');
 									entries_comment.setAttribute('name','comment');

 									entries_title.value = e;
 									entries_comment.value = entry_parse[e];

 									let entries_del = document.createElement('button');
 									entries_del.addEventListener('click',function(){
 										edit_div.removeChild(entries_div);
 									});

 									let entries_del_txt = document.createTextNode('x');
 									entries_del.appendChild(entries_del_txt);

 									entries_div.appendChild(entries_title);
 									entries_div.appendChild(entries_comment);
 									entries_div.appendChild(entries_del);

 									edit_div.appendChild(entries_div);
 								}

 								let edit_cancel_txt = document.createTextNode('cancel');
 								edit_cancel.appendChild(edit_cancel_txt);
 								edit_bt_box.appendChild(edit_cancel);

 								let extra_bt = document.createElement('button');

 								let edit_submit = document.createElement('button');

 								edit_submit.addEventListener('click',function(){

 									let edit_obj = {};
									let trip = true;
 									let find_inp = document.getElementsByTagName('input');
 									let found;

 									let failsafe = 0;

 									for(let g=0; g<find_inp.length; g++){
 										failsafe += 1;
 									}

 									if(failsafe == 2){

 										let single_entry = confirm('Single entry detected. Are you sure you want to submit this edit?');
 										if(single_entry == true){
 											
 											console.log(key + ' ' + 'key');

 											let fsObj = {};
 											fsObj[find_inp[0].value] = find_inp[1].value;
 											console.log(fsObj);

 											let fsSTR = JSON.stringify(fsObj);
 											localStorage.removeItem(key);
 											let newLS = key;
 											localStorage.setItem(newLS,fsSTR);
 											location.reload();

 										}

 									}//end fs if

 									else {//begin fs else

 									for(let i=0;i<find_inp.length; i+=2){
 										// console.log(find_inp[i].value + ' : ' + find_inp[i+1].value);
 										// console.log(find_inp[i].value + ' ' + 'I');

										let count = 0;
										
 										for(let r=0;r<find_inp.length; r+=2){
 											// console.log(find_inp[r].value + ' ' + 'R');											
 											if(find_inp[i].value == find_inp[r].value){
 												count+=1;
 												console.log(count + ' ' + 'count');
 												if(count>1){
													// alert('Error: Titles cannot share a name XXX');
													console.log(count + ' ' + 'found 2');
													found = count;
 													trip = false;

 												}
 											} else{
 												edit_obj[find_inp[i].value] = find_inp[i+1].value;
 											}
 										}
 									}

 									if(trip == true){
 										let final_edit = confirm('Multiple entries detected. Are you sure you want to submit this edit?');
 										if(final_edit == true){
 											console.log('true');
 											localStorage.removeItem(key);
 											let obj_str = JSON.stringify(edit_obj);
 											localStorage.setItem(key,obj_str);
 											location.reload();
 										}
 									} else {
 										alert(found + ' (or more)' + ' ' + 'identical titles found. cannot submit edit');
 									}

 							}//end fs else

 								});

 								let edit_submit_txt = document.createTextNode('submit');
 								edit_submit.appendChild(edit_submit_txt);
 								edit_bt_box.appendChild(edit_submit);
 								
 								edit_div.appendChild(edit_bt_box);

 							});

						}//end sort loop 1 - 6
					}//end sort loop 2 - 6
				}//end sort loop 3 - 6
			}//end sort loop 4 - 6
		}//end sort loop 5 - 6
	}//end sort loop 6 - 6

	let find = document.getElementById('find');
	let find_div = document.createElement('div');
	find_div.setAttribute('id','find_div');
	find_div.appendChild(select);
	find.appendChild(find_div);

	let find_display = document.createElement('div');
	find_display.setAttribute('id','f_dis');
	find.appendChild(find_display);

	let first_ls = localStorage.getItem(select.value);
	let first_parsed = JSON.parse(first_ls);
	// console.log(first_parsed);

	for(let x in first_parsed){
		find_display.innerHTML += x.toUpperCase() + ' : ' + first_parsed[x] + '<br>' + '<br>';
	}

	select.addEventListener('change',function(){

		let ls_find = localStorage.getItem(select.value);
		let ls_parsed = JSON.parse(ls_find);

		function clear(){
			find_display.innerHTML = '';
		}

		clear();

		for(let obj in ls_parsed){
			find_display.innerHTML += obj.toUpperCase() + ' : ' + ls_parsed[obj] + '<br>' + '<br>';
		}

	});

	








