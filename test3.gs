["", "c0 = char(0);c33 = char(33);tp = @typeof;cs = @clear_screen;ui=@user_input;gs=get_shell;hc=gs.host_computer;c10=function(int=1);  if not tp(int) == ", "+", "number", ".quote+
", " or (tp(int) == ", "+", "number", ".quote+", " and int==1) then return char(10);  return (char(10)*int);end function;import_code(", "+", "/root/blackbox/master.so", ".quote+", 
");if not active_user == ", "+", "root", ".quote+", " then exit ", "+", "*** blbx: must run as root ***", ".quote+", ".color(", "+", "red", ".quote+", ");import_code(", "+", "/root
/blackbox/markup.so", ".quote+", ");cs;program={", "+", "version", ".quote+", ":", "+", "beta", ".quote+", ", ", "+", "credits", ".quote+", ":{", "+", "name", ".quote+", ":", "+", 
"Ikodane", ".quote+", ", ", "+", "discord", ".quote+", ":", "+", "#1353", ".quote+", "}, ", "+", "reference", ".quote+", ":hc.File(program_path), ", "+", "demo", ".quote+", ":false
};//LOGO:;if not params.join(", "+", "", ".quote+", ").search(", "+", "-q", ".quote+", ") then print logo+(b+(a+program.version.color(", "+", "black", ".quote+", ")+", "+", " by ",
 ".quote+", ".color(", "+", "black", ".quote+", ")+(", "+", "@", ".quote+", "+program.credits.name).color(", "+", "purple", ".quote+", ")+program.credits.discord.color(", "+", "bla
ck", ".quote+", ")))+c0;import_code(", "+", "/root/blackbox/json.so", ".quote+", ");import_code(", "+", "/root/blackbox/dict.so", ".quote+", ");command={", "+", "process", ".quote+
", ":1, ", "+", "prompt", ".quote+", ":", "+", "", ".quote+", ", ", "+", "is_auto", ".quote+", ":0};op={", "+", "pipeMode", ".quote+", ":0, ", "+", "addMode", ".quote+", ":0, ", "+
", "grabMode", ".quote+", ":0};inputClean=function(list);l=[];for i in list;if i == ", "+", " ", ".quote+", " or i == ", "+", "", ".quote+", " then continue;l.push(i);end for;retur
n l;end function;import_code(", "+", "/root/blackbox/internal.so", ".quote+", ");import_code(", "+", "/root/blackbox/bincmds.so", ".quote+", ");import_code(", "+", "/root/blackbox/
customcmds.so", ".quote+", ");f=hc.File(", "+", "/", ".quote+", ");;//comment copy-pasta:;// debug --;//{", "+", "status", ".quote+", ":0, ", "+", "data", ".quote+", ":error_catch}
;;command.safe_run = function(commandName, cmd);  if not command.hasIndex(commandName) then ;    print cnf(commandName) + c0;    return {", "+", "status", ".quote+", ": 0, ", "+", 
"data", ".quote+", ": []};  end if;;  proxy = @command[commandName];  if tp(@proxy) != ", "+", "function", ".quote+", " then ;    print cnf(commandName)+c0;    return {", "+", "sta
tus", ".quote+", ": 0, ", "+", "data", ".quote+", ": []};  end if;;  return proxy(cmd);end function;;if not hc.is_network_active then connect_to_wifi;rtr=get_router;;if tp(hc.File(
", "+", "/etc/apt/sources.txt", ".quote+", ")) != ", "+", "file", ".quote+", " then ;hc.touch(", "+", "/etc/apt", ".quote+", ", ", "+", "sources.txt", ".quote+", ");f=hc.File(", "+
", "/etc/apt/sources.txt", ".quote+", ");f.set_content(JSON.write({", "+", "official_server", ".quote+", ":1, ", "+", "sourceList", ".quote+", ":{}}));end if;apt_sources_map=JSON.r
ead( hc.File(", "+", "/etc/apt/sources.txt", ".quote+", ").get_content );;aptclient=include_lib( objects.nf(hc.File(", "+", "/", ".quote+", "), 0, ", "+", "aptclient.so", ".quote+"
, ").path );if not aptclient then exit(c(", "+", "r", ".quote+", ")+", "+", "*** aptclient.so not found on machine ***", ".quote+", ");;command.exit=function(cmd);command.process=0
;end function;;//Boot up and maintainance:;//lib_paths=[", "+", "/root/blackbox/metaxploit.so", ".quote+", ", ", "+", "/root/blackbox/crypto.so", ".quote+", "];;pocket={", "+", "ma
p", ".quote+", ":{}};pocket.init=function();pocket.map={};for i in command.indexes[3:];pocket.map[i]=[];end for;end function;pocket.init();pocket.has=function(commandName);if pocke
t.map.hasIndex(commandName) then return true;return false;end function;pocket.add=function(data, commandName);pocket.map[commandName]=[data];end function;pocket.rm=function(command
Name);pocket.map[commandName]=[];end function;pocket.grab=function(commandName);if not pocket.map[commandName].len then return false;return pocket.map[commandName].pull;end functio
n;pocket.get=function(commandName);if not pocket.map[commandName].len then return false;return pocket.map[commandName][0];end function;pocket.is_full=function(commandName);store=po
cket.get(commandName);if not store then return false;if store.len > 0 then return true;return false;end function;pocket.summary=function();l=[];for i in pocket.map;if i.value==[] t
hen continue;l.push(i.key);end for;return l;end function;pocket.clear=function();pocket.map={};end function;;if not pocket.summary.len then csr=", "+", "$", ".quote+", " else csr=p
ocket.summary.join(", "+", " ", ".quote+", ");command.prompt=next+box(", "+", "blbx", ".quote+", ")+wisp+box(nav.get())+wisp+box(csr)+wisp+box(reveal((user.current.name.color(", "+
", "black", ".quote+", "))+(", "+", "@", ".quote+", ".color(", "+", "purple", ".quote+", "))+(hide_ip(ip.lan).color(", "+", "black", ".quote+", ")), (user.current.name!=", "+", "",
 ".quote+", "), ", "+", "@", ".quote+", "))+next+wisp+box(", "+", "#", ".quote+", ")+u2+c(", "+", "p", ".quote+", ")+", "+", "> ", ".quote+", "+b+c(", "+", "b", ".quote+", ");;// c
ommand1 ^push to pocket;// command1 > command2pipe from command1 pocket to next command;// command1 >+ command2pipe from command1 pocket to command2 pocket and store.;;segment=func
tion(input_str, input_map);  chain=input_str.split(", "+", " : ", ".quote+", ");  if chain.len == 1 then run_type_single=true else run_type_single=false;  operators=[", "+", " \^",
 ".quote+", ", ", "+", " > ", ".quote+", ", ", "+", " >\+ ", ".quote+", "];  error_catch=[];  cout=0;  for link in chain;    nbif [", "+", "+", ".quote+", ", ", "+", ">", ".quote+", 
", ", "+", "^", ".quote+", "].has(link[-1]) then link=link+", "+", " ", ".quote+", "// this makes sure that the operators are found inside links even when the operator is at the en
d.;;    if pocket.summary.len > 0 then csr=pocket.summary.join(", "+", " ", ".quote+", ") else csr=", "+", "$", ".quote+", ";    command.prompt=next+box(", "+", "blbx", ".quote+", 
")+wisp+box(nav.get())+wisp+box(csr)+wisp+box(reveal((user.current.name.color(", "+", "black", ".quote+", "))+(", "+", "@", ".quote+", ".color(", "+", "purple", ".quote+", "))+(hid
e_ip(ip.lan).color(", "+", "black", ".quote+", ")), (user.current.name!=", "+", "", ".quote+", "), ", "+", "@", ".quote+", "))+next+wisp+box(", "+", "#", ".quote+", ")+u2+c(", "+",
 "p", ".quote+", ")+", "+", "> ", ".quote+", "+b+c(", "+", "b", ".quote+", ");;    //debug -- announce(", "+", "link", ".quote+", ", link);    operation=link.split(operators.join("
, "+", "|", ".quote+", "));    //debug -- announce(", "+", "operation", ".quote+", ", operation);    if operation.len > 2 then ;    error_catch.push(", "+", "pipe: only one pipe op
erator per link is allowed...", ".quote+", ");    break;    end if;;    if link.search(", "+", " ^", ".quote+", ") then;      command1=operation[0].split(", "+", " ", ".quote+", ")
[0];      if not input_map.hasIndex(command1) then ;      print cnf(command1);      break;      end if;      if not run_type_single then show_prompt(input_map, operation[0].split("
, "+", " ", ".quote+", "));      try=input_map.safe_run(command1, operation[0].split(", "+", " ", ".quote+", "));      if tp(try) != ", "+", "map", ".quote+", " then continue;     
 if tp(try) == ", "+", "map", ".quote+", " and try.status then pocket.add(try.data, command1);      if tp(try) == ", "+", "map", ".quote+", " and not try.status then ;      error_c
atch=try.data;      break;      end if;      continue;    end if;;    if link.search(", "+", " >+", ".quote+", ") then;      //since this operator is capable of iteration, put a li
st in the pocket of the second command that results will be pushed to;      command1=operation[0].split(", "+", " ", ".quote+", ")[0];      command2=operation[1].split(", "+", " ",
 ".quote+", ")[0];      args=operation[1].split(", "+", " ", ".quote+", ")[1:];      if command2 == ", "+", "", ".quote+", " then ;      error_catch.push(", "+", "pipe '", ".quote+
", "+", "+", ">+", ".quote+", ".color(", "+", "white", ".quote+", ")+", "+", "': must specify a second command...", ".quote+", ");      break;      end if;;      if not input_map.h
asIndex(command1) then ;      print cnf(command1);      break;      end if;;      iter=pocket.grab(command1);      if tp(iter) != ", "+", "list", ".quote+", " then iter=[iter];    
  break_toggle=0;;      second_pocket=[];;      for item in iter;        // debug -- announce(", "+", "item", ".quote+", ", item+", "+", " : ", ".quote+", "+tp(item));        if no
t input_map.hasIndex(command2) and command2 != ", "+", "", ".quote+", " then ;        print cnf(command2);        break;        end if;        if break_toggle then break;        if
 tp(item) == ", "+", "list", ".quote+", " then;          for i in item;            show_prompt(input_map, (command2+", "+", " ", ".quote+", "+item+reveal(", "+", " ", ".quote+", "+
args.join(", "+", " ", ".quote+", "), (args.len > 0))).split(", "+", " ", ".quote+", "));            if command2 == ", "+", "", ".quote+", " then ;            error_catch.push(", "
+", "pipe '", ".quote+", "+", "+", ">", ".quote+", ".color(", "+", "white", ".quote+", ")+", "+", "': must specify a second command...", ".quote+", ");            break_toggle=1;  
          break;            end if;            try=input_map.safe_run(command2, (command2+", "+", " ", ".quote+", "+reveal(args.join(", "+", " ", ".quote+", "), (args.len > 0))+", 
"+", " ", ".quote+", "+i).split(", "+", " ", ".quote+", "));            //try=input_map.safe_run(command2, [command2]+args+[i]);;            if tp(try) != ", "+", "map", ".quote+",
 " then continue;            if tp(try) == ", "+", "map", ".quote+", " and try.status then second_pocket.push(try.data);            if tp(try) == ", "+", "map", ".quote+", " and no
t try.status then ;            error_catch=try.data;            break_toggle=1;            break;            end if;          end for;          continue;        end if;;        if 
not input_map.hasIndex(command2) and command2 != ", "+", "", ".quote+", " then ;        print cnf(command2);        break;        end if;        show_prompt(input_map, (command2+",
 "+", " ", ".quote+", "+item+reveal(", "+", " ", ".quote+", "+args.join(", "+", " ", ".quote+", "), (args.len > 0))).split(", "+", " ", ".quote+", "));        if command2 == ", "+"
, "", ".quote+", " then ;        error_catch.push(", "+", "pipe '", ".quote+", "+", "+", ">", ".quote+", ".color(", "+", "white", ".quote+", ")+", "+", "': must specify a second co
mmand...", ".quote+", ");        break;        end if;;        try=input_map.safe_run(command2, (command2+", "+", " ", ".quote+", "+item+reveal(", "+", " ", ".quote+", "+args.join(
", "+", " ", ".quote+", "), (args.len > 0))).split(", "+", " ", ".quote+", "));;        if tp(try) != ", "+", "map", ".quote+", " then continue;        if tp(try) == ", "+", "map",
 ".quote+", " and try.status then"]