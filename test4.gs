prev: c0 = char(0);c33 = char(33);tp = @typeof;cs = @clear_screen;ui=@user_input;gs=get_shell;hc=gs.host_computer;c10=function(int=1);  if not tp(int) == 
curr: +
next: number


prev:  or (tp(int) == 
curr: +
next: number


prev:  and int==1) then return char(10);  return (char(10)*int);end function;import_code(
curr: +
next: /root/blackbox/master.so


prev: );if not active_user == 
curr: +
next: root


prev:  then exit 
curr: +
next: *** blbx: must run as root ***


prev: .color(
curr: +
next: red


prev: );import_code(
curr: +
next: /root/blackbox/markup.so


prev: );cs;program={
curr: +
next: version


prev: :
curr: +
next: beta


prev: , 
curr: +
next: credits


prev: :{
curr: +
next: name


prev: :
curr: +
next: Ikodane


prev: , 
curr: +
next: discord


prev: :
curr: +
next: #1353


prev: }, 
curr: +
next: reference


prev: :hc.File(program_path), 
curr: +
next: demo


prev: :false};//LOGO:;if not params.join(
curr: +
next: 


prev: ).search(
curr: +
next: -q


prev: ) then print logo+(b+(a+program.version.color(
curr: +
next: black


prev: )+
curr: +
next:  by 


prev: .color(
curr: +
next: black


prev: )+(
curr: +
next: @


prev: +program.credits.name).color(
curr: +
next: purple


prev: )+program.credits.discord.color(
curr: +
next: black


prev: )))+c0;import_code(
curr: +
next: /root/blackbox/json.so


prev: );import_code(
curr: +
next: /root/blackbox/dict.so


prev: );command={
curr: +
next: process


prev: :1, 
curr: +
next: prompt


prev: :
curr: +
next: 


prev: , 
curr: +
next: is_auto


prev: :0};op={
curr: +
next: pipeMode


prev: :0, 
curr: +
next: addMode


prev: :0, 
curr: +
next: grabMode


prev: :0};inputClean=function(list);l=[];for i in list;if i == 
curr: +
next:  


prev:  or i == 
curr: +
next: 


prev:  then continue;l.push(i);end for;return l;end function;import_code(
curr: +
next: /root/blackbox/internal.so


prev: );import_code(
curr: +
next: /root/blackbox/bincmds.so


prev: );import_code(
curr: +
next: /root/blackbox/customcmds.so


prev: );f=hc.File(
curr: +
next: /


prev: );;//comment copy-pasta:;// debug --;//{
curr: +
next: status


prev: :0, 
curr: +
next: data


prev: :error_catch};;command.safe_run = function(commandName, cmd);  if not command.hasIndex(commandName) then ;    print cnf(commandName) + c0;    return {
curr: +
next: status


prev: : 0, 
curr: +
next: data


prev: : []};  end if;;  proxy = @command[commandName];  if tp(@proxy) != 
curr: +
next: function


prev:  then ;    print cnf(commandName)+c0;    return {
curr: +
next: status


prev: : 0, 
curr: +
next: data


prev: : []};  end if;;  return proxy(cmd);end function;;if not hc.is_network_active then connect_to_wifi;rtr=get_router;;if tp(hc.File(
curr: +
next: /etc/apt/sources.txt


prev: )) != 
curr: +
next: file


prev:  then ;hc.touch(
curr: +
next: /etc/apt


prev: , 
curr: +
next: sources.txt


prev: );f=hc.File(
curr: +
next: /etc/apt/sources.txt


prev: );f.set_content(JSON.write({
curr: +
next: official_server


prev: :1, 
curr: +
next: sourceList


prev: :{}}));end if;apt_sources_map=JSON.read( hc.File(
curr: +
next: /etc/apt/sources.txt


prev: ).get_content );;aptclient=include_lib( objects.nf(hc.File(
curr: +
next: /


prev: ), 0, 
curr: +
next: aptclient.so


prev: ).path );if not aptclient then exit(c(
curr: +
next: r


prev: )+
curr: +
next: *** aptclient.so not found on machine ***


prev: );;command.exit=function(cmd);command.process=0;end function;;//Boot up and maintainance:;//lib_paths=[
curr: +
next: /root/blackbox/metaxploit.so


prev: , 
curr: +
next: /root/blackbox/crypto.so


prev: ];;pocket={
curr: +
next: map


prev: :{}};pocket.init=function();pocket.map={};for i in command.indexes[3:];pocket.map[i]=[];end for;end function;pocket.init();pocket.has=function(commandName);if pocket.map.hasI
ndex(commandName) then return true;return false;end function;pocket.add=function(data, commandName);pocket.map[commandName]=[data];end function;pocket.rm=function(commandName);pock
et.map[commandName]=[];end function;pocket.grab=function(commandName);if not pocket.map[commandName].len then return false;return pocket.map[commandName].pull;end function;pocket.g
et=function(commandName);if not pocket.map[commandName].len then return false;return pocket.map[commandName][0];end function;pocket.is_full=function(commandName);store=pocket.get(c
ommandName);if not store then return false;if store.len > 0 then return true;return false;end function;pocket.summary=function();l=[];for i in pocket.map;if i.value==[] then contin
ue;l.push(i.key);end for;return l;end function;pocket.clear=function();pocket.map={};end function;;if not pocket.summary.len then csr=
curr: +
next: $


prev:  else csr=pocket.summary.join(
curr: +
next:  


prev: );command.prompt=next+box(
curr: +
next: blbx


prev: )+wisp+box(nav.get())+wisp+box(csr)+wisp+box(reveal((user.current.name.color(
curr: +
next: black


prev: ))+(
curr: +
next: @


prev: .color(
curr: +
next: purple


prev: ))+(hide_ip(ip.lan).color(
curr: +
next: black


prev: )), (user.current.name!=
curr: +
next: 


prev: ), 
curr: +
next: @


prev: ))+next+wisp+box(
curr: +
next: #


prev: )+u2+c(
curr: +
next: p


prev: )+
curr: +
next: > 


prev: +b+c(
curr: +
next: b


prev: );;// command1 ^push to pocket;// command1 > command2pipe from command1 pocket to next command;// command1 >+ command2pipe from command1 pocket to command2 pocket and store.;;segment=function(input_str, input_map);  chain=input_str.split(
curr: +
next:  : 


prev: );  if chain.len == 1 then run_type_single=true else run_type_single=false;  operators=[
curr: +
next:  \^


prev: , 
curr: +
next:  > 


prev: , 
curr: +
next:  >\+ 


prev: ];  error_catch=[];  cout=0;  for link in chain;    if [
curr: +
next: +


prev: +
curr: +
next: .quote+


prev: , 
curr: +
next: >


prev: , 
curr: +
next: ^


prev: ].has(link[-1]) then link=link+
curr: +
next:  


prev: // this makes sure that the operators are found inside links even when the operator is at the end.;;    if pocket.summary.len > 0 then csr=pocket.summary.join(
curr: +
next:  


prev: ) else csr=
curr: +
next: $


prev: ;    command.prompt=next+box(
curr: +
next: blbx


prev: )+wisp+box(nav.get())+wisp+box(csr)+wisp+box(reveal((user.current.name.color(
curr: +
next: black


prev: ))+(
curr: +
next: @


prev: .color(
curr: +
next: purple


prev: ))+(hide_ip(ip.lan).color(
curr: +
next: black


prev: )), (user.current.name!=
curr: +
next: 


prev: ), 
curr: +
next: @


prev: ))+next+wisp+box(
curr: +
next: #


prev: )+u2+c(
curr: +
next: p


prev: )+
curr: +
next: > 


prev: +b+c(
curr: +
next: b


prev: );;    //debug -- announce(
curr: +
next: link


prev: , link);    operation=link.split(operators.join(
curr: +
next: |


prev: ));    //debug -- announce(
curr: +
next: operation


prev: , operation);    if operation.len > 2 then ;    error_catch.push(
curr: +
next: pipe: only one pipe operator per link is allowed...


prev: );    break;    end if;;    if link.search(
curr: +
next:  ^


prev: ) then;      command1=operation[0].split(
curr: +
next:  


prev: )[0];      if not input_map.hasIndex(command1) then ;      print cnf(command1);      break;      end if;      if not run_type_single then show_prompt(input_map, operation[0].split(
curr: +
next:  


prev: ));      try=input_map.safe_run(command1, operation[0].split(
curr: +
next:  


prev: ));      if tp(try) != 
curr: +
next: map


prev:  then continue;      if tp(try) == 
curr: +
next: map


prev:  and try.status then pocket.add(try.data, command1);      if tp(try) == 
curr: +
next: map


prev:  and not try.status then ;      error_catch=try.data;      break;      end if;      continue;    end if;;    if link.search(
curr: +
next:  >+


prev: ) then;      //since this operator is capable of iteration, put a list in the pocket of the second command that results will be pushed to;      command1=operation[0].split(
curr: +
next:  


prev: )[0];      command2=operation[1].split(
curr: +
next:  


prev: )[0];      args=operation[1].split(
curr: +
next:  


prev: )[1:];      if command2 == 
curr: +
next: 


prev:  then ;      error_catch.push(
curr: +
next: pipe '


prev: .quote+
curr: +
next: +


prev: +
curr: +
next: >+


prev: .color(
curr: +
next: white


prev: )+
curr: +
next: ': must specify a second command...


prev: );      break;      end if;;      if not input_map.hasIndex(command1) then ;      print cnf(command1);      break;      end if;;      iter=pocket.grab(command1);      if tp(iter) != 
curr: +
next: list


prev:  then iter=[iter];      break_toggle=0;;      second_pocket=[];;      for item in iter;        // debug -- announce(
curr: +
next: item


prev: , item+
curr: +
next:  : 


prev: +tp(item));        if not input_map.hasIndex(command2) and command2 != 
curr: +
next: 


prev:  then ;        print cnf(command2);        break;        end if;        if break_toggle then break;        if tp(item) == 
curr: +
next: list


prev:  then;          for i in item;            show_prompt(input_map, (command2+
curr: +
next:  


prev: +item+reveal(
curr: +
next:  


prev: +args.join(
curr: +
next:  


prev: ), (args.len > 0))).split(
curr: +
next:  


prev: ));            if command2 == 
curr: +
next: 


prev:  then ;            error_catch.push(
curr: +
next: pipe '


prev: .quote+
curr: +
next: +


prev: +
curr: +
next: >


prev: .color(
curr: +
next: white


prev: )+
curr: +
next: ': must specify a second command...


prev: );            break_toggle=1;            break;            end if;            try=input_map.safe_run(command2, (command2+
curr: +
next:  


prev: +reveal(args.join(
curr: +
next:  


prev: ), (args.len > 0))+
curr: +
next:  


prev: +i).split(
curr: +
next:  


prev: ));            //try=input_map.safe_run(command2, [command2]+args+[i]);;            if tp(try) != 
curr: +
next: map


prev:  then continue;            if tp(try) == 
curr: +
next: map


prev:  and try.status then second_pocket.push(try.data);            if tp(try) == 
curr: +
next: map


prev:  and not try.status then ;            error_catch=try.data;            break_toggle=1;            break;            end if;          end for;          continue;        end if;;        if not input_map.hasIndex(command2) and command2 != 
curr: +
next: 


prev:  then ;        print cnf(command2);        break;        end if;        show_prompt(input_map, (command2+
curr: +
next:  


prev: +item+reveal(
curr: +
next:  


prev: +args.join(
curr: +
next:  


prev: ), (args.len > 0))).split(
curr: +
next:  


prev: ));        if command2 == 
curr: +
next: 


prev:  then ;        error_catch.push(
curr: +