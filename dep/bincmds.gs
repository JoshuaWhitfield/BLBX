command.cd=function(cmd);error_catch=[];head=" "+cmd[0];temp={"file":0}
  if not cmd.hasIndex(1) then return {"status":0, "data":error_catch}
  if ["-h", "--h", "-help", "--help"].has(cmd[1]) then
    usage({"usage":["cd full_path|abbr_path|keyword", "cd ..."], "note":["-'abbr_path' is a path that does not contain the full name of files and directories.", c10+c10+" -'...' denotes going back to the root directory regardless of current position.", c10+" example: cd /ro/bl/db = cd /root/blackbox/db"]})
    return {"status":0, "data":error_catch}
  end if
  if cmd[1] == "/" or cmd[1] == "..." then
    nav.set("/")
    return {"status":1, "data":nav.get()}
  end if

  if cmd[1][0] == "/" then cmd[1]=cmd[1][1:]
  if cmd[1][-1] == "/" then cmd[1]=cmd[1][:-1]
  queue=cmd[1].split("/")

  if status.is_active then entry_file=device.current.mainf else entry_file=hc.File("/")
  testf=get_file(cmd[1], entry_file, 1)
  if tp(testf) == "string" then ;print testf;return {"status":0, "data":error_catch};end if

  inc=-1
  for i in queue
    inc=inc+1;confirm=false
    if not status.is_active then file=hc.File(nav.get()) else file=objects.nf(device.current.mainf, nav.get())
    if i == ".." then;if nav.get() == "/" then continue;file=file.parent;nav.set(file.path);continue;end if
    for ide in file.get_folders;if ide.name.lower.search(i.lower) then ;nav.set(ide.path);confirm=true;break;end if;end for
    if confirm then continue
    error_catch.push(parse_error(cmd[1], head+": directory '", 1))
    return {"status":0, "data":error_catch}
  end for

  return {"status":1, "data":nav.get()}
end function

command.ls=function(cmd);error_catch=[];head=" "+cmd[0];temp={"file":0}
  init=function()
    if status.is_active then entry_file=device.current.mainf else entry_file=hc.File("/")
    if not cmd.hasIndex(1) then ;cmd.push(nav.get());temp.file=objects.nf(entry_file, cmd[1]);end if
    temp.file=get_file(cmd[1], entry_file, 1)
    if not temp.file then ;error_catch.push(parse_error(cmd[1], head+": directory '", 1));return false;end if
    if tp(temp.file) == "string" then ;print temp.file;return false;end if
    if not temp.file.is_folder then ;error_catc.push(head+": file is not a directory...");return false;end if
    return true
  end function
  if not init() then return {"status":0, "data":error_catch}

  lead=c("b")+"PERMS GROUP OWNER SIZE NAME"
  folders=[]
  binary=[]
  text=[]
  pathList=[]

  for i in temp.file.get_folders+temp.file.get_files
    pathList.push(i.path)
    if not i.is_folder and not i.is_binary then text.push((i.permissions+" "+i.group+" "+i.owner+" "+i.size+" "+i.name).color("black"))
    if i.is_folder then folders.push((i.permissions+" "+i.group+" "+i.owner+" "+i.size+" ").color("purple")+b+(i.name.color("purple")))
    if i.is_binary and not i.is_folder then binary.push((i.permissions+" "+i.group+" "+i.owner+" "+i.size+" ").color("purple")+b+(i.name.color("white")))
  end for
  //print(format.columns([lead]+folders+binary+text))
  ([lead]+folders+binary+text).format_columns
  add_line
  return {"status":1, "data":pathList}
end function

command.clear=function(cmd);cs;end function

command.cat=function(cmd);error_catch=[];head=" "+cmd[0];temp={"file":0, "hide":0, "flip":0}
  init=function()
    if cmd.len < 2 then ;usage({"usage":[" cat filePath|fileName OPT: -hide, -flip"], "note":[" -'fileName' looks for a file in the current dir by name.", " -'hide' flag hides output and just returns the result for cleaner piping.", "-'flip' flag reverses the content of the file. "]});return false;end if
    if status.is_active then entry_file=device.current.mainf else entry_file=hc.File("/")

    temp.file=get_file(cmd[1], entry_file)
    if not temp.file then ;error_catch.push(parse_error(cmd[1], head+": file '"));return false;end if
    if tp(temp.file) == "string" then ;print temp.file;return false;end if

    flag=get_flags(["-hide", "-h", "-flip", "-f"], cmd[1:].join(" "))
    if tp(flag) == "list" and flag.has(["-h", "-hide"]) then temp.hide=1
    if tp(flag) == "list" and flag.has(["-f", "-flip"]) then temp.flip=1

    return true
  end function
  if not init then return {"status":0, "data":error_catch}

  if temp.file.is_binary or temp.file.is_folder then ;error_catch.push(head+": '"+temp.file.name+"' is not a text file...");return {"status":0, "data":error_catch};end if
  if temp.file.has_permission("r") then; result=[];raw=[]
    if not temp.file.get_content.is_empty then
      if not temp.file.get_content.search(c10) then l=temp.file.get_content.split(" ") else l=temp.file.get_content.split(c10)
      if temp.flip then l=l.reverse
      for i in l;if i == c10 then continue;result.push(b+(i.color("black black purple")));raw.push(i);end for
      result=result.join(c10)
      if result.len > 0 then
        while result[-1] == c10;result=result[:-1];end while
      end if
      if not temp.hide then print result+c10
    end if
    return {"status":1, "data":raw}
  end if

  error_catch.push(head+": permission denied...")
  return {"status":0, "data":error_catch}
end function

command.rm=function(cmd);error_catch=[];head=" "+cmd[0];temp={"file":0}
  init=function()
    if cmd.len < 2 then ;usage({"usage":[" rm fileName|filePath"], "note":[" [rm] can delete folders as well."]});return false;end if
    if status.is_active then entry_file=device.current.mainf else entry_file=hc.File("/")

    temp.file=get_file(cmd[1], entry_file)
    if not temp.file then ;error_catch.push(parse_error(cmd[1], head+": file '"));return false;end if
    if tp(temp.file) == "string" then ;print temp.file;return false;end if

    return true
  end function
  if not init() then return {"status":0, "data":error_catch}

  store=temp.file.delete
  if store.len > 0 then ;error_catch.push(parse_error(store, head+": ", 0));return {"status":0, "data":error_catch};end if
  success
end function

command.pwd=function(cmd)
  print b+(nav.get().color("black"))
  return {"status":1, "data":nav.get()}
end function

command.ps=function(cmd);error_catch=[];head=" "+cmd[0];temp={"comp":0}
  init=function()
    if status.is_active then temp.comp=objects.borrow("computer") else temp.comp=hc
    if tp(temp.comp) != "computer" then ;error_catch.push(head+": no computer objects from victim stored...");return false;end if
    return true
  end function
  if not init then return {"status":0, "data":error_catch}
  pcs=temp.comp.show_procs;list=pcs.split(c10);newl=[];pid=[];s=" "
  for line in list
    ;if line.search("PID CPU") then
      ;newl.push("USER PID CPU MEM PROC".color("black"))
      ;continue
    ;end if
    line_list=line.split(" ")
    ;pid.push(line_list[1])

    line=line_list[:-1].join(" ").color("black black purple")+" "+b+(line_list[-1].color("purple"))
    ;newl.push(line)
  end for
  newl.format_columns
  //print(format.columns(newl))
  ;add_line
  return {"status":1, "data":pid}
end function

command.ifconfig=function(cmd);error_catch=[];head=" "+cmd[0];temp={"comp":0}
  init=function()
    if cmd.has(["-h", "--h", "--help", "help"]) then
      usage({"usage":["ifconfig", "ifconfig -h"], "short":["--if"], "desc":["displays the gateway, public, and local ip address. it will display a victim's information when connected to a victim."]})
      return false
    end if
    if status.is_active then temp.comp=objects.borrow("computer") else temp.comp=hc
    if tp(temp.comp) != "computer" then ;error_catch.push(head+": no computer objects from user '"+user.current.name+"' stored...");return false;end if
    return true
  end function
  if not init() then return {"status":0, "data":error_catch}
  if status.is_active then router=get_router(ip.pub) else router=get_router

  lip=temp.comp.local_ip
  pip=router.public_ip
  gw=temp.comp.network_gateway
  output=""
  if temp.comp.active_net_card == "WIFI" then;output=output+b+("wifi connection @ '"+router.essid_name.color("purple")+"'").color("black");else;output=output+b+"ethernet connection...".color("black");end if
  output=output+c10+bar(27)

  output=output+c10+b+c("b")+"public ip: "+c("p")+pip
  output=output+c10+b+c("b")+"local ip: "+c("p")+lip
  output=output+c10+b+c("b")+"gateway: "+c("p")+gw

  print screen.add(output+c10+c0)


  return {"status":1, "data":[pip, lip, gw]}
end function
command["--if"]=@command.ifconfig

command.mv=function(cmd);error_catch=[];head=" "+cmd[0];temp={"file":0, "dest":0}
  init=function()
    if cmd.len < 2 then ;usage({"usage":[" mv filePath|fileName|keyword toPath"], "note":[" -search for multiple files that match the keyword and move them.", "  example: mv .json /root/blackbox/json"]});return false;end if
    if not cmd.hasIndex(2) then cmd.push(nav.get())
    if status.is_active then entry_file=device.current.mainf else entry_file=hc.File("/")

    temp.file=get_file(cmd[1], entry_file)
    if not temp.file then ;error_catch.push(parse_error(cmd[1], head+": file '"));return false;end if
    if tp(temp.file) == "string" then ;print temp.file;return false;end if

    if cmd[2].split("/").len == 1 then ;error_catch.push(head+": destination must be a path...");return false;end if
    temp.dest=get_file(cmd[2], entry_file)
    if not temp.dest then ;error_catch.push(parse_error(cmd[2], head+": destination '"));return false;end if

    return true
  end function
  if not init() then return {"status":0, "data":error_catch}
  try=temp.file.move(temp.dest.path, temp.file.name)
  if tp(try) == "string" then ;error_catch.push(parse_error(try, head+": ", 0));return {"status":0, "data":error_catch};end if
  success
end function

command.rename=function(cmd);error_catch=[];head=" "+cmd[0];temp={"file":0,"name":0}
  init=function()
    //usage: rename fileName|filePath name
    if cmd.len < 2 then
      usage({"usage":[" rename fileName|filePath toName", " rename toName "], "note":[" -when the file to be renamed is ommited, the current directory is modified."]})
      return false
    end if
    if not cmd.hasIndex(2) then cmd=[cmd[0], nav.get(),cmd[1]]
    if status.is_active then entry_file=device.current.mainf else entry_file=hc.File("/")
    temp.name=cmd[2]

    temp.file=get_file(cmd[1], entry_file)
    if not temp.file then ;error_catch.push(parse_error(cmd[1], head+": '"));return false;end if
    if tp(temp.file) == "string" then ;print temp.file;return false;end if

    return true
  end function
  if not init() then return {"status":0, "data":error_catch}

  try=temp.file.rename(temp.name)
  if tp(try) == "string" and try.len > 0 then ;error_catch.push(parse_error(try, head+": ", 0));return {"status":0, "data":error_catch};end if
  success
end function
command["--re"]=@command.rename

command.touch=function(cmd);error_catch=[];head=" "+cmd[0];temp={"comp":0,"file":0, "path":0, "name":0}
  init=function()
    if cmd.len > 3 or cmd.len < 2 then
      usage({"usage":[" touch dest name", " touch name"], "short":[" --t"]})
      return false
    end if
    if status.is_active then ;entry_file=device.current.mainf;temp.comp=user.current.c;if not temp.comp then temp.comp=objects.borrow("computer"); else ;entry_file=hc.File("/");temp.comp=hc;end if
    if cmd.hasIndex(2) then ;temp.path=cmd[1];temp.name=cmd[2]; else ;temp.path=nav.get();temp.name=cmd[1]; end if

    if temp.path.split("/").len == 1 then ;error_catch.push(head+": destination must be a path...");return false;end if
    temp.file=get_file(temp.path, entry_file)
    if not temp.file then ;error_catch.push(parse_error(cmd[1].elipsis+"' not found.", head+": directory '" , cmd[1]+"' not found..."));return false;end if

    return true
  end function
  if not init() then return {"status":0, "data":error_catch}

  try=temp.comp.touch(temp.path, temp.name)
  if tp(try) == "string" then ;error_catch.push(parse_error(try, head+": ", 0));return {"status":0, "data":error_catch};end if
  if try == 1 then res=temp.comp.File(temp.path+"/"+temp.name).path else res=0
  success
  return {"status":1, "data":res}
end function
command["--t"]=@command.touch

command.copy=function(cmd);error_catch=[];head=" "+cmd[0];temp={"file":0, "dest":0}
  init=function()
    if cmd.len < 2 then ;usage({"usage":[" copy fileName|filePath|keyword dest", " copy fileName|filePath|keyword"], "note":[" -if 'toPath' is omitted, the current directory will be used."]});return false;end if
    if not cmd.hasIndex(2) then cmd.push(nav.get())
    if status.is_active then entry_file=device.current.mainf else entry_file=hc.File("/")

    temp.file=get_file(cmd[1], entry_file)
    if not temp.file then ;error_catch.push(parse_error(cmd[1], head+": file '"));return false;end if
    if tp(temp.file) == "string" then ;print temp.file;return false;end if

    if cmd[2].split("/").len == 1 then ;error_catch.push(head+": destination must be a path...");return false;end if
    temp.dest=get_file(cmd[2], entry_file)
    if not temp.dest then ;error_catch.push(parse_error(cmd[2], head+": destination '"));return false;end if

    return true
  end function
  if not init then return {"status":0, "data":error_catch}

  try=temp.file.copy(temp.dest.path, temp.file.name)
  if tp(try) == "string" then ;error_catch.push(parse_error(try, head+": ", 0));return {"status":0, "data":error_catch};end if
  success
end function
command["--cp"]=@command.copy
//1 --r rh=180.8.35.122 p=80 : --c 192.168.1.2 : touch / testFile : nano /testFile

command.chmod=function(cmd);error_catch=[];head=" "+cmd[0];temp={"file":0, "isRec":1}
  init=function()
    if cmd.len < 2 then
      usage({"usage":[" chmod ugo+wrx|ugo-wrx filePath"], "note":["-characters before and after the '+-' symbol can be omitted.", "examples: u-wr, g+wx", " -if there are no characters before or after the '+-' symbol, then 'ugo' and 'wrx' are used respectively.", "examples: +wr, g-, +"]})
      return false
    end if
    if not cmd.hasIndex(2) then cmd.push(nav.get)
    if status.is_active then entry_file=device.current.mainf else entry_file=hc.File("/")

    temp.file=get_file(cmd[2], entry_file)
    if not temp.file then ;error_catch.push(parse_error(cmd[2], head+": file '"));return false;end if
    if tp(temp.file) == "string" then ;print temp.file;return false;end if

    determine_req=function(req)
      reql=reveal(req.split("\+"), (req.search("+")), req.split("\-"))
      if reql.len < 2 then return false
      if req.search("+") and req.search("-") then return false
      usrd=reql[0]//usrd = user_description
      opd=reql[1]//opd = operation_description
      res=1
      for usr in usrd
        if tp(["","u","g","o"].indexOf(usr)) != "number" then ;res=0;break;end if
      end for
      for op in opd
        if tp(["","w","r","x"].indexOf(op)) != "number" then ;res=0;break;end if
      end for
      return res
    end function

    if not determine_req(cmd[1]) then
      error_catch.push(head+": '"+cmd[1]+"' invalid operation...")
      return false
    end if
    req=cmd[1]
    reql=reveal(req.split("\+"), (req.search("+")), req.split("\-"))
    if reql[0] == "" then cmd[1]="ugo"+cmd[1]
    if reql[1] == "" then cmd[1]=cmd[1]+"wrx"
    return true
  end function
  if not init() then return {"status":0, "data":error_catch}
  req=cmd[1]
  reql=reveal(req.split("\+"), (req.search("+")), req.split("\-"))
  sep=reveal("+", (req.search("+")), "-")
  usrd=reql[0]//usrd = user_description
  opd=reql[1]//opd = operation_description
  if not get_flags(["-r", "-R"], cmd[1:].join(" ")) then temp.isRec=0
  for usr in usrd
    try=temp.file.chmod(usr+sep+opd, temp.isRec)
    if try.len > 0 then
      error_catch.push(parse_error(try, head+": ", 0))
      break
    end if
  end for
  if error_catch.len > 0 then ;return {"status":0, "data":error_catch};end if
  success
end function
command["--cm"]=@command.chmod

command.build=function(cmd);error_catch=[];head=" "+cmd[0];temp={"file":0, "dest":0, "shell":0, "ai":0}
  init=function()
    if cmd.len < 2 then ;usage({"usage":["build sourcePath name", "build sourcePath"], "note":[" -if 'name' is omitted, the binary will share the source file's name"]});return false;end if
    if status.is_active then entry_file=device.current.mainf else entry_file=hc.File("/")

    temp.file=get_file(cmd[1], entry_file)
    if not temp.file then ;error_catch.push(parse_error(cmd[1], head+": '"));return false;end if
    if tp(temp.file) == "string" then ;print temp.file;return false;end if

    if not cmd.hasIndex(2) then cmd.push(temp.file.path.split("/")[-1][:-4])
    if cmd[2].split("/").len == 1 then ;error_catch.push(head+": destination must be a path...");return false;end if
    temp.dest=get_file(cmd[2], entry_file)

    if status.is_active then
      if not objects.borrow("shell") then
        error_catch.push(head+": no shell objects stored on this machine...")
        return false
      end if
      temp.shell=objects.borrow("shell")
    else
      temp.shell=gs
    end if
    flag=get_flags(["-i", "import"], cmd[1:].join(" "))
    if tp(flag) == "null" then temp.ai=0
    if tp(flag) == "list" and flag.len then ;error_catch.push(head+": invalid flag...");return false;end if
    if tp(flag) == "list" and flag.len > 0 then temp.ai=1

    return true
  end function
  if not init() then return {"status":0, "data":error_catch}

  try=temp.shell.build(temp.file.path, temp.dest.path, temp.ai)
  if tp(try) == "string" and try.len > 0 then ;error_catch.push(parse_error(try, head+": ", 0));return {"status":0, "data":error_catch};end if

  success
end function

command.passwd=function(cmd);error_catch=[];head=" "+cmd[0];temp={"comp":0, "user":0, "passwd":0}
  init=function()
    if cmd.len < 2 then ;usage({"usage":[" passwd user_name new_passwd"]});return false;end if

    if status.is_active then temp.user=device.get_user(cmd[1], ip.lan) else temp.user=cmd[1]
    if not temp.user then ;error_catch.push(head+": '"+cmd[1]+"@"+ip.lan+"' not found in user tree...");return false;end if

    if status.is_active then temp.comp=objects.borrow("computer") else temp.comp=hc
    if not temp.comp then ;error_catch.push(head+": no computer objects stored from this machine...");return false;end if

    mp=wisp+box("new password")+b+"> ".color("purple")+c("b")//mp = mini_prompt
    while not cmd.hasIndex(2)
      password=ui(mp)
      if password.len > 15 then ;print b+(head+": maximum length of 15 chars required...").color("black");continue;end if
      cmd.push(password)
    end while
    temp.passwd=cmd[2]
    return true
  end function
  if not init() then return {"status":0, "data":error_catch}

  output=temp.comp.change_password(temp.user, temp.passwd)
  if tp(output) == "string" and output.len>0 then
    error_catch.push(parse_error(output, head+": ", 0))
    return {"status":0, "data":error_catch}
  end if
  success
  return {"status":1, "data":[temp.user, temp.passwd]}
end function
command["--pa"]=@command.passwd

command.nslookup=function(cmd);error_catch=[];head=" "+cmd[0];temp={"val":0}
  init=function()
    if cmd.len < 2 then
      usage({"usage":[" nslookup domain"]})
      return false
    end if
    domain=cmd[1].split("\.")
    if domain[1] != "www" and domain.len == 2 then ;domain=domain.reverse;domain.push("www");domain=domain.reverse;end if
    if (not domain.len == 3) or (domain.len == 3) and domain[0] != "www" then
      error_catch.push(head+": invalid domain...")
      return false
    end if
    temp.val=domain.join(".")
    return true
  end function
  if not init() then return {"status":0, "data":error_catch}

  print b+(temp.val.color("black")+" -> ".color("purple")+nslookup(temp.val).color("black"))
  add_line
  return {"status":1, "data":nslookup(temp.val)}
end function
command["--ns"]=@command.nslookup

command.chown=function(cmd);error_catch=[];head=" "+cmd[0];temp={"file":0, "flag":0}
  init=function()
    //usage: chown owner filePath|fileName|keyword OPT: -r
    if cmd.len < 3 then ;usage({"usage":[" chown owner filePath|fileName|keyword OPT: -r"], "long":["-recursive"]});return false;end if
    if status.is_active then entry_file=device.current.mainf else entry_file=hc.File("/")

    temp.file=get_file(cmd[2], entry_file)
    if not temp.file then ;error_catch.push(parse_error(cmd[2], head+": '"));return false;end if
    if tp(temp.file) == "string" then ;print temp.file;return false;end if

    flagl=get_flags(["-r", "-rec", "-recursive"], cmd[1:].join(" "))
    if tp(flagl) != "null" then temp.flag=1
    return true
  end function
  if not init() then return {"status":0, "data":error_catch}
  try=temp.file.set_owner(cmd[1], temp.flag)
  if tp(try) == "string" and try.len > 0 then ;error_catch.push(parse_error(try, head+": ", 0));return {"status":0, "data":error_catch};end if
  success
end function
command["--co"]=@command.chown

command.chgrp=function(cmd);error_catch=[];head=" "+cmd[0];temp={"file":0, "flag":0}
  init=function()
    //usage: chgrp group filePath|fileName|keyword OPT: -r
    if cmd.len < 3 then ;usage({"usage":[" chgrp group filePath|fileName|keyword OPT: -r"], "long":["-recursive"]});return false;end if
    if status.is_active then entry_file=device.current.mainf else entry_file=hc.File("/")

    temp.file=get_file(cmd[2], entry_file)
    if not temp.file then ;error_catch.push(parse_error(cmd[2], head+": '"));return false;end if
    if tp(temp.file) == "string" then ;print temp.file;return false;end if

    flagl=get_flags(["-r", "-recursive"], cmd[1:].join(" "))
    if tp(flagl) != "null" then temp.flag=1
    return true
  end function
  if not init then return {"status":0, "data":error_catch}
  try=temp.file.set_group(cmd[1], temp.flag)
  if tp(try) == "string" and try.len > 0 then ;error_catch.push(parse_error(try, head+": ", 0));return {"status":0, "data":error_catch};end if
  success
end function
command["--cg"]=@command.chgrp

command.whoami=function(cmd);error_catch=[];head=" "+cmd[0]
  init=function()
    if cmd.has(["-h", "--h", "--help", "help"]) then
      usage({"usage":["whoami", "whoami -h"], "desc":["this command displays the current connections the blbx is under. this command will display the user, local ip, and public ip of the victim that blbx is connected to."]})
      return false
    end if
    return true
  end function
  if not init then return {"status":0, "data":error_catch}
  if status.is_active then print b+(ip.pub.color("purple")+":".color("black")+c10)+b+(user.current.name.color("black")+"@".color("purple")+ip.lan.color("black")) else print b+("root".color("black")+"@".color("purple")+"blbx".color("black"))
  add_line
end function
command["--who"]=@command.whoami

command.kill=function(cmd);error_catch=[];head=" "+cmd[0];temp={"pid":0, "comp":0}
  init=function()
    if cmd.len < 2 then
      usage({"usage":[" kill [PID] opt: pid=..."], "note":[" -multiple process id's can be referenced by seperating them by comma.", " example: kill pid=[PID], [PID], [PID]"]})
      return false
    end if
    if status.is_active then temp.comp=objects.borrow("computer") else temp.comp=hc
    if tp(temp.comp) != "computer" then
      error_catch.push(head+": no computer objects from victim stored...")
      return false
    end if
    flag=get_flags(["pid=", "p="], cmd[1:].join(" "))
    if tp(flag) == "list" then 
      temp.pid=cmd[1:].join(" ").split(flag[0])[1].split(" ")[0]
      return true
    end if

    temp.pid = cmd[1]

    return true
  end function
  if not init then return {"status":0, "data":error_catch}

  status=1
  for pid in temp.pid.split(",|, ")
    pid=pid.to_int
    if not tp(pid) == "number" then continue
    try=temp.comp.close_program(pid)
    if tp(try) == "string" then ;error_catch.push(parse_error(try, head+": ", 0));status=0;break;end if
    if not try then ;error_catch.push(head+": process id '"+str(pid)+"' not found...");status=0;break;end if
    printb("ending proc: ".color("black")+str(pid).color("purple"))
  end for
  if not status then return {"status":0, "data":error_catch}
  add_line
end function
command["--k"]=@command.kill

command.mkdir=function(cmd);error_catch=[];head=" "+cmd[0];temp={"dest":0, "comp":0, "name":0}
  init=function()
    //mkdir name
    //mkdir dir_path name
    if cmd.len < 2 then ;usage({"usage":[" mkdir dir_path name", " mkdir name"], "note":[" -when 'dir_path' is ommitted, the current path is used."]});return false;end if
    if not cmd.hasIndex(2) then cmd=[cmd[0], nav.get(), cmd[1]]
    temp.name=cmd[2]
    if status.is_active then temp.comp=objects.borrow("computer") else temp.comp=hc
    temp.dest=get_file(cmd[1], temp.comp.File("/"))
    if tp(temp.dest) != "file" then ;error_catch.push(parse_error(cmd[1], head+": '"));return false;end if

    return true
  end function
  if not init then return {"status":0, "data":error_catch}

  try=temp.comp.create_folder(temp.dest.path, temp.name)
  if tp(try) == "string" and try.len > 0 then ;error_catch.push(parse_error(try, head+": ", 0));return {"status":0, "data":error_catch}; end if

  success
  return  {"status":1, "data":temp.dest.path+"/"+name}
end function
command["--mk"]=@command.mkdir

command.help=function(cmd);error_catch=[];head=" "+cmd[0]
  init=function()
    if cmd.len < 2 or (cmd.len >= 2 and tp(cmd[1].to_int) != "number") or (cmd.len >= 2 and tp(cmd[1].to_int) == "number" and cmd[1].to_int > 4) then
      printb("provide an index number:".color("black"))
      print([box("0")+wisp+box("reconnaissance"), box("1")+wisp+box("file handling"), box("2")+wisp+box("hacking"), box("3")+wisp+box("piping"), box("4")+wisp+box("bin commands")].join(c10)+c10+c0)
      return false
    end if
    return true
  end function
  if not init then return {"status":0, "data":error_catch}

  cmd_list=[]
  for item in command.indexes[3:] ;if item.search("--") then continue;cmd_list.push(item);end for

  cut_off=cmd_list.indexOf("connect")
  bin_list=cmd_list[:cut_off]
  custom_list=cmd_list[cut_off:]

  auxilliary=["recon", "show -h", "users -h", "nmap", "sweep -h", "wipe -h", "decipher", "whois -h", "whoami -h", "ifconfig -h", "ping -h"]
  file_handling=["get", "send", "apt-get", "json", "nano", "cat", "find", "run", "update -h", "json"]
  hacking=["connect", "disconnect", "trojan", "start", "logs -h", "migrate -h", "bank -h", "mail -h", "farm -h"]
  piping=["macro", "pocket", "syntax -h"]
  bin_cmds=["cd -h", "ls", "clear", "cat", "rm", "pwd", "ps", "ifconfig -h", "mv", "rename", "touch", "copy", "chmod", "build", "passwd", "nslookup", "chown", "chgrp", "whoami -h", "kill", "mkdir", "whois -h", "help"]
  item_map={"recon":auxilliary, "file handling":file_handling, "hacking":hacking, "piping":piping, "bin commands":bin_cmds}
  result=[]

  for i in item_map.values[cmd[1].to_int]
    result.push(b+" "+i.color("black black purple"))
  end for
  print(result.join(c10)+c10+c0)
  printb("run the following as commands to see their usage.".color("black"))
end function
//bincmds.so
