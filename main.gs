c0 = char(0)
c33 = char(33)
tp = @typeof
cs = @clear_screen
ui=@user_input
gs=get_shell
hc=gs.host_computer
c10=function(int=1)
  if not tp(int) == "number" or (tp(int) == "number" and int==1) then return char(10)
  return (char(10)*int)
end function
import_code("/root/blackbox/master.so")
if not active_user == "root" then exit "*** blbx: must run as root ***".color("red")
import_code("/root/blackbox/markup.so")
cs
program={"version":"beta", "credits":{"name":"Ikodane", "discord":"#1353"}, "reference":hc.File(program_path), "demo":false}
//LOGO:
if not params.join("").search("-q") then print logo+(b+(a+program.version.color("black")+" by ".color("black")+("@"+program.credits.name).color("purple")+program.credits.discord.color("black")))+c0
import_code("/root/blackbox/json.so")
import_code("/root/blackbox/dict.so")
command={"process":1, "prompt":"", "is_auto":0}
op={"pipeMode":0, "addMode":0, "grabMode":0}
inputClean=function(list)
l=[]
for i in list
if i == " " or i == "" then continue
l.push(i)
end for
return l
end function
import_code("/root/blackbox/internal.so")
import_code("/root/blackbox/bincmds.so")
import_code("/root/blackbox/customcmds.so")
f=hc.File("/")

//comment copy-pasta:
// debug --
//{"status":0, "data":error_catch}

command.safe_run = function(commandName, cmd)
  if not command.hasIndex(commandName) then 
    print cnf(commandName) + c0
    return {"status": 0, "data": []}
  end if

  proxy = @command[commandName]
  if tp(@proxy) != "function" then 
    print cnf(commandName)+c0
    return {"status": 0, "data": []}
  end if

  return proxy(cmd)
end function

if not hc.is_network_active then connect_to_wifi
rtr=get_router

if tp(hc.File("/etc/apt/sources.txt")) != "file" then 
hc.touch("/etc/apt", "sources.txt")
f=hc.File("/etc/apt/sources.txt")
f.set_content(JSON.write({"official_server":1, "sourceList":{}}))
end if
apt_sources_map=JSON.read( hc.File("/etc/apt/sources.txt").get_content )

aptclient=include_lib( objects.nf(hc.File("/"), 0, "aptclient.so").path )
if not aptclient then exit(c("r")+"*** aptclient.so not found on machine ***")

command.exit=function(cmd)
command.process=0
end function

//Boot up and maintainance:
//lib_paths=["/root/blackbox/metaxploit.so", "/root/blackbox/crypto.so"]

pocket={"map":{}}
pocket.init=function()
pocket.map={}
for i in command.indexes[3:]
pocket.map[i]=[]
end for
end function
pocket.init()
pocket.has=function(commandName)
if pocket.map.hasIndex(commandName) then return true
return false
end function
pocket.add=function(data, commandName)
pocket.map[commandName]=[data]
end function
pocket.rm=function(commandName)
pocket.map[commandName]=[]
end function
pocket.grab=function(commandName)
if not pocket.map[commandName].len then return false
return pocket.map[commandName].pull
end function
pocket.get=function(commandName)
if not pocket.map[commandName].len then return false
return pocket.map[commandName][0]
end function
pocket.is_full=function(commandName)
store=pocket.get(commandName)
if not store then return false
if store.len > 0 then return true
return false
end function
pocket.summary=function()
l=[]
for i in pocket.map
if i.value==[] then continue
l.push(i.key)
end for
return l
end function
pocket.clear=function()
pocket.map={}
end function

if not pocket.summary.len then csr="$" else csr=pocket.summary.join(" ")
command.prompt=next+box("blbx")+wisp+box(nav.get())+wisp+box(csr)+wisp+box(reveal((user.current.name.color("black"))+("@".color("purple"))+(hide_ip(ip.lan).color("black")), (user.current.name!=""), "@"))+next+wisp+box("#")+u2+c("p")+"> "+b+c("b")

// command1 ^push to pocket
// command1 > command2pipe from command1 pocket to next command
// command1 >+ command2pipe from command1 pocket to command2 pocket and store.

segment=function(input_str, input_map)
  chain=input_str.split(" : ")
  if chain.len == 1 then run_type_single=true else run_type_single=false
  operators=[" \^", " > ", " >\+ "]
  error_catch=[]
  cout=0
  for link in chain
    if ["+", ">", "^"].has(link[-1]) then link=link+" "// this makes sure that the operators are found inside links even when the operator is at the end.

    if pocket.summary.len > 0 then csr=pocket.summary.join(" ") else csr="$"
    command.prompt=next+box("blbx")+wisp+box(nav.get())+wisp+box(csr)+wisp+box(reveal((user.current.name.color("black"))+("@".color("purple"))+(hide_ip(ip.lan).color("black")), (user.current.name!=""), "@"))+next+wisp+box("#")+u2+c("p")+"> "+b+c("b")

    //debug -- announce("link", link)
    operation=link.split(operators.join("|"))
    //debug -- announce("operation", operation)
    if operation.len > 2 then 
    error_catch.push("pipe: only one pipe operator per link is allowed...")
    break
    end if

    if link.search(" ^") then
      command1=operation[0].split(" ")[0]
      if not input_map.hasIndex(command1) then 
      print cnf(command1)
      break
      end if
      if not run_type_single then show_prompt(input_map, operation[0].split(" "))
      try=input_map.safe_run(command1, operation[0].split(" "))
      if tp(try) != "map" then continue
      if tp(try) == "map" and try.status then pocket.add(try.data, command1)
      if tp(try) == "map" and not try.status then 
      error_catch=try.data
      break
      end if
      continue
    end if

    if link.search(" >+") then
      //since this operator is capable of iteration, put a list in the pocket of the second command that results will be pushed to
      command1=operation[0].split(" ")[0]
      command2=operation[1].split(" ")[0]
      args=operation[1].split(" ")[1:]
      if command2 == "" then 
      error_catch.push("pipe '"+">+".color("white")+"': must specify a second command...")
      break
      end if

      if not input_map.hasIndex(command1) then 
      print cnf(command1)
      break
      end if

      iter=pocket.grab(command1)
      if tp(iter) != "list" then iter=[iter]
      break_toggle=0

      second_pocket=[]

      for item in iter
        // debug -- announce("item", item+" : "+tp(item))
        if not input_map.hasIndex(command2) and command2 != "" then 
        print cnf(command2)
        break
        end if
        if break_toggle then break
        if tp(item) == "list" then
          for i in item
            show_prompt(input_map, (command2+" "+item+reveal(" "+args.join(" "), (args.len > 0))).split(" "))
            if command2 == "" then 
            error_catch.push("pipe '"+">".color("white")+"': must specify a second command...")
            break_toggle=1
            break
            end if
            try=input_map.safe_run(command2, (command2+" "+reveal(args.join(" "), (args.len > 0))+" "+i).split(" "))
            //try=input_map.safe_run(command2, [command2]+args+[i])

            if tp(try) != "map" then continue
            if tp(try) == "map" and try.status then second_pocket.push(try.data)
            if tp(try) == "map" and not try.status then 
            error_catch=try.data
            break_toggle=1
            break
            end if
          end for
          continue
        end if

        if not input_map.hasIndex(command2) and command2 != "" then 
        print cnf(command2)
        break
        end if
        show_prompt(input_map, (command2+" "+item+reveal(" "+args.join(" "), (args.len > 0))).split(" "))
        if command2 == "" then 
        error_catch.push("pipe '"+">".color("white")+"': must specify a second command...")
        break
        end if

        try=input_map.safe_run(command2, (command2+" "+item+reveal(" "+args.join(" "), (args.len > 0))).split(" "))

        if tp(try) != "map" then continue
        if tp(try) == "map" and try.status then second_pocket.push(try.data)
        if tp(try) == "map" and not try.status then 
        error_catch=try.data
        break
        end if
      end for
      if second_pocket.len > 0 then pocket.add(second_pocket, command2)
      continue
    end if

    if link.search(" >") then
      command1=operation[0].split(" ")[0]
      command2=operation[1].split(" ")[0]
      args=operation[1].split(" ")[1:]

      if not input_map.hasIndex(command1) then 
      print cnf(command1)
      break
      end if

      iter=pocket.grab(command1)
      if tp(iter) != "list" then iter=[iter]
      break_toggle=0

      for item in iter
        // debug -- announce("item", item+" : "+tp(item))
        if not input_map.hasIndex(command2) and command2 != "" then 
        print cnf(command2)
        break
        end if
        if break_toggle then break
        if tp(item) == "list" then
          // debug -- announce("item", item)
          for i in item
            show_prompt(input_map, (command2+" "+i+reveal(" "+args.join(" "), (args.len > 0))).split(" "))
            if command2 == "" then 
            error_catch.push("pipe '"+">".color("white")+"': must specify a second command...")
            break_toggle=1
            break
            end if
            try=input_map.safe_run(command2, (command2+" "+i+reveal(" "+args.join(" "), (args.len > 0))).split(" "))

            if tp(try) != "map" then continue
            if tp(try) == "map" and not try.status then 
            error_catch=try.data
            break_toggle=1
            break
            end if
          end for
          continue
        end if

        if not input_map.hasIndex(command2) and command2 != "" then 
        print cnf(command2)
        break
        end if
        show_prompt(input_map, (command2+" "+item+reveal(" "+args.join(" "), (args.len > 0))).split(" "))
        if command2 == "" then 
        error_catch.push("pipe '"+">".color("white")+"': must specify a second command...")
        break_toggle=1
        break
        end if
        try=input_map.safe_run(command2, (command2+" "+item+reveal(" "+args.join(" "), (args.len > 0))).split(" "))

        if tp(try) != "map" then continue
        if tp(try) == "map" and not try.status then 
        error_catch=try.data
        break
        end if
      end for
      continue
    end if

    if link.split(" ")[0].search("@") then
      //links containing macros cannot use pipe operators
      macro_name=link.split(" ")[0][1:]
      if not misc.macro_db_map.hasIndex(macro_name) then 
      print mnf(macro_name)+c0
      continue
      end if
      if pocket.summary.len > 0 then csr=pocket.summary.join(" ") else csr="$"
      input_map.prompt=next+box("blbx")+wisp+box(nav.get())+wisp+box(csr)+wisp+box(reveal((user.current.name.color("black"))+("@".color("purple"))+(hide_ip(ip.lan).color("black")), (user.current.name!=""), "@"))+next+wisp+box("#")+u2+c("p")+"> "+b+c("b")
      segment(misc.macro_db_map[macro_name].values.join(" : "), input_map)
      continue
    end if

    cout=cout+1
    command1=link.split(" ")[0]
    if not input_map.hasIndex(command1) then 
    print cnf(command1)
    break
    end if
    if not run_type_single then show_prompt(input_map, link.split(" "))
    try=input_map.safe_run(command1, link.split(" "))

    if tp(try) != "map" then continue
    if tp(try) == "map" and not try.status then 
    error_catch=try.data
    break
    end if

  end for

  if error_catch.len then errorDisplay(error_catch[0]) //errorDisplay
end function


if tp(objects.nf(hc.File("/"), "/root/blackbox")) != "file" then hc.create_folder("/root", "blackbox")
blbx_folder=objects.nf(hc.File("/"), "/root/blackbox")
hc.create_folder("/root/blackbox", "db")
if tp(hc.File("/root/blackbox/json")) != "file" then
  hc.touch("/root/blackbox/json", "config.json")
  objects.nf(hc.File("/"), "/root/blackbox/json/config.json").set_content(JSON.write({"hide_db_files":1, "streamer_mode":0, "main_color":"#7A53F6", "number_exploit_new_password":"1234", "er_crit":0}).enc)

  hc.touch("/root/blackbox/json", "dia.json")
  objects.nf(hc.File("/"), "/root/blackbox/json/dia.json").set_content(JSON.write({}).enc)
  hc.touch("/root/blackbox/json", "net.json")
  objects.nf(hc.File("/"), "/root/blackbox/json/net.json").set_content(JSON.write({}).enc)//{"pubIP":[port, user, passwd]}
  hc.touch("/root/blackbox/json", "ruse.json")
  objects.nf(hc.File("/"), "/root/blackbox/json/ruse.json").set_content(JSON.write({"login":""}).enc)
end if

for i in ["/root/blackbox/json/config.json", "/root/blackbox/json/dia.json", "/root/blackbox/json/net.json"]
if not tp(hc.File(i)) == "file" then hc.touch(i.split("/")[:-1].join("/"), i.split("/")[-1])
end for
if tp(hc.File("/root/blackbox/json/config.json")) == "file" then
  if not hc.File("/root/blackbox/json/config.json").get_content.len then 
  hc.File("/root/blackbox/json").delete
  gs.launch(current_path)
  end if

  map=JSON.read(hc.File("/root/blackbox/json/config.json").get_content.dec)
  color.map.p=map.main_color //this was previously commented before debugging. might be the cause of future bugs.
  misc.changePasswdTo=map.number_exploit_new_password
  status.streamer_mode=map.streamer_mode
  status.hide_db_files=map.hide_db_files
end if


if tp(objects.nf(hc.File("/"), "/root/blackbox/json/net.json")) == "file" then
end if
if tp(objects.nf(hc.File("/"), "/root/blackbox/json/dia.json")) == "file" then
end if

temp_map=JSON.read(hc.File("/root/blackbox/json/config.json").get_content.dec)

temp_map.er_crit=temp_map.er_crit+1
// print hc.File("/root/blackbox/json/config.json").set_content(JSON.write(temp_map))
// print
// print hc.File("/root/blackbox/json/config.json").set_content(JSON.write(temp_map)).enc
// print 

// hc.File("/root/blackbox/json/config.json").set_content(JSON.write(temp_map).enc)


mx=get_library("metaxploit.so")
co=get_library("crypto.so")

l=[tp(mx),tp(co)]

if tp(l.indexOf("null")) == "number" then
  sources=apt_sources_map.sourceList.indexes
  //if sources.len == 0 then exit(c10+"*** missing dependencies. add a repo using 'apt-get addrepo [hackshopIP]'. find a hackshop in the Brower by searching for 'shop'. ***".color("red"))
  libraries = ["metaxploit.so", "crypto.so"]
  for dependency in libraries
    store = aptclient.install(dependency, "/root/blackbox")
    if tp(store) == "string" then 
      print ("*** " + store + " ***").color("red")
      
    end if
  end for
  // aptclient.install("metaxploit.so", "/root/blackbox")
  // aptclient.install("crypto.so", "/root/blackbox")
  //exit
  cs
  for i in ["/root/blackbox/metaxploit.so", "/root/blackbox/crypto.so"]
    print(a+b+("*** "+("'"+i+"'").color("black black white")+" installed! ***").color("purple")+c0)
  end for
  mx=get_library("metaxploit.so")
  co=get_library("crypto.so")
end if

check=[]
for i in ["/root/blackbox/db/.exploit", "/root/blackbox/db/.macro", "/root/blackbox/db/.alias", "/root/blackbox/db/.bank", "/root/blackbox/db/.mail", "/root/blackbox/db/.dictionary"]
  f=hc.File(i)
  if not tp(f) == "file" then check.push(i.split("/.")[-1])
end for
db={}
db.set=function(input_list)
l=[".dictionary", ".exploit", ".macro", ".alias", ".bank", ".mail"]
store=[]
  print c10+a+bar(40)+c0
  for i in input_list
  store=DB.create(i)
  if i.search("dictionary") then 
  PasswordGenerator.init(PasswordGenerator.PASSWORDS)

  
  printb(a+"*** building hash map ***".color("purple"))
  
  printb(a+"please wait".color("black"))
  
  DB.addTo(PasswordGenerator.AllPasswords, "dictionary")
  
  end if
  
  if store then printb(a+("*** database ".color("purple")+("'"+i+"'").color("black black white")+" created! ***".color("purple")))
  end for
end function
if check.len > 0 and command.process then
  db.set(check)
end if
//base_macro_package={"logs":{0:"ls /var"}}
if tp(poly.get.dict) != "list" then poly.get.dict=DB.extract_list("dictionary")
if tp(poly.get.bank) != "list" then poly.get.bank=DB.extract_list("bank")
if tp(poly.get.mail) != "list" then poly.get.mail=DB.extract_list("mail")
add_line
action.login
add_line
printb(a("center")+"exploits stored: ".color("black")+str(aux.exploits.mem_list.len).color("purple"))
printb(a("center")+"passwords stored: ".color("black")+str(poly.get.dict.len).color("purple"))
printb(a("center")+"bank acc's stored: ".color("black")+str(poly.get.bank.len).color("purple"))
add_line
//------------------------

while command.process
  if pocket.summary.len > 0 then csr=pocket.summary.join(" ") else csr="$" //box(reveal((user.current.name.color("black"))+("@".color("purple"))+(hide_ip(ip.lan).color("black")), (user.current.name!=""), "@"))
  command.prompt=box("blbx")+wisp+box(nav.get)+wisp+box(csr)+ reveal(wisp+box(user.current.name.color("black")+"@".color("purple")+hide_ip(ip.lan).color("black")), (ip.lan!="127.0.0.1"), "") +next+wisp+box("#")+u2+c("p")+"> "+b+c("b")
  //print params.len
  if command.is_auto then command.is_auto=0
  if not params.len then 
  cmd=inputClean(ui(command.prompt).split(" "))
  add_line
   else
  cmd=params
  command.is_auto=1
  if params.join(" ").split(" : ").len == 1 then show_prompt(command, cmd)
  params=[]
   end if

  if not cmd.len then continue

  segment(cmd.join(" "), command)
  continue
end while

//if poly.get.migration.status then
//end if

//main
