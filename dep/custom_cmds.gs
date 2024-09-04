command.connect=function(cmd);error_catch=[];head=" "+cmd[0];temp={"q":0}
  init=function()
    if cmd.len < 2 then ;usage({"usage":[" connect lanIP OPT: user"], "short":[" --c"], "note":[" -must run after collecting objects with [recon]", " -if no username is specified, then the best user is used"]});return false;end if
    if ip=={"pub":"", "lan":"", "lanList":[]} then ;error_catch.push(head+": must run after obtaining objects with [recon]...");return false;end if;
    if not is_lan_ip(cmd[1]) then ;error_catch.push(head+": invalid lan IP...");return false;end if
    if not device.tree.hasIndex(cmd[1]) then ;error_catch.push(head+": '"+cmd[1]+"' not found in device tree...");return false;end if
    if not cmd.hasIndex(2) then cmd.push("root")
    res=0
    for i in device.user_list[cmd[1]]
      if i.lower.search(cmd[2].lower) then ;res=i;break; end if
    end for
    if not res then ;error_catch.push(head+": '"+cmd[2]+"@"+cmd[1]+"' not found in user tree...");return false;end if
    if (user.current.name==res and cmd[1]==ip.lan) then ;error_catch.push(head+": already connected to '"+user.current.name+"@"+ip.lan+"'...");return false;end if
    cmd[2]=res

    flag=get_flags(["-quiet", "-q"], cmd[1:].join(" "), 1)
    if flag.has(["-quiet", "-q"]) then temp.q=1

    return true
  end function
  if not init() then return {"status":0, "data":error_catch}

  if ip.lan != cmd[1] then nav.remoteDir="/"
  ip.lan=cmd[1];name=cmd[2]
  device.current=device.tree[ip.lan]
  user.current=user.tree[ip.lan][name]
  status.is_active=true

  if not temp.q then ;print notify(("'"+hide_ip(ip.pub)+"'").color("black black white")+" @ "+("'"+hide_ip(ip.lan)+"'").color("black black white"), "connected")+c0;add_line;end if
end function
command["--c"]=@command.connect

command.disconnect=function(cmd)
  if not status.is_active then return
  print notify("disconnecting from "+("'"+hide_ip(ip.pub)+"'").color("black black white"))+c0
  status.is_active=false
  user.current={"name":""}
  device.current={}
  ip.lan="127.0.0.1"
end function
command["--dc"]=@command.disconnect

command.wipe=function(cmd)
  ip.pub="";ip.lan="127.0.0.1";ip.lanList=[]
  objects.wipe
  device.wipe
  user.wipe
  user.tree={}
  collect
end function
command["--w"]=@command.wipe


command.reconT = function(cmd);error_catch = [];head = " " + cmd[0]
    config = {"rhost": 0, "port": [], "lan": 0, "scan": 0, "net": 0, "third": misc.CPT, "change": 0}
    init = function()
        if cmd.len < 2 then 
            usage({"usage":["recon public_ip OPT: [port|p]=80,22,0 | [lan|l]=local_ip | [-db | [-scan|-s]]"]})
            return false
        end if

        confi

        flags = get_flags(["port=", "p=", "lan=", "l="], cmd[1:].join(" "), 1)
       
        if flags.has(["port=", "p="]) then 
            results = cmd[1:].join(" ").split(get_flags(["port=", "p="], cmd[1:].join(" "))[0])[1]
            candidates = results.split(",") 
            for candidate in candidates
                if typeof(candidate.to_int) != "number" then continue
                config.ports.push(candidate.to_int)
            end for
        end if

        if flags.has(["lan=", "l="]) then 
            config.lan = cmd[1:].join(" ").split(get_flags(["lan=", "l="], cmd[1:].join(" "))[0])[1].split(" ")[0]
            if not is_lan_ip(config.lan) then 
                error_catch.push(head+": invalid local ip [" + config.lan + "] ...")
                return false
            end if
        end if
    end function
    if not init() then return {"status": 0, "data": error_catch}
end function

command.recon=function(cmd);error_catch=[];head=" "+cmd[0];config={"rhost":0, "port":0, "lan":0, "scan":0, "net":0, "third":misc.CPT, "change":0};temp={"q":0}
  init=function()
    //USAGE: recon rhost=pubIP port=80,22,21,0 [OPT: lan=lanIP]
    if cmd.len < 2 then ;usage({"usage":["recon rhost=pubIP OPT: port=80,22,0 | lan=lanIP | -db"]});return false;end if
    flag=get_flags(["-quiet", "-q", "rhost=", "rh=", "port=", "p=", "lan=", "l="], cmd[1:].join(" "), 1)

    if flag.has(["rhost=", "rh="]) then
      config.rhost=cmd[1:].join(" ").split(get_flags(["rhost=", "rh="], cmd[1:].join(" "))[0])[1].split(" ")[0]
      if is_valid_ip(nslookup(config.rhost)) then config.rhost=nslookup(config.rhost)
      if not is_valid_ip(config.rhost) then
        error_catch.push(head+": invalid public ip address...")
        return false
      end if
      if tp(get_router(config.rhost))!="router" then ;error_catch.push(head+": cannot probe this public ip address...");return false;end if
    else
      error_catch.push(head+": 'rhost=' must be specified...")
      return false
    end if
    if not config.rhost then
      error_catch.push(head+": ip address must be prefixed by 'rhost='...")
      return false
    end if
    if flag.has(["port=", "p="]) then
      config.port=cmd[1:].join(" ").split(get_flags(["port=", "p="], cmd[1:].join(" "))[0])[1].split(" ")[0]
      if tp(config.port.to_int) != "number" then ;error_catch.push(head+": port must be an interger...");return false;end if
      if config.port == "0" then config.port = 0
    end if
    if flag.has(["lan=", "l="]) then
      config.lan=cmd[1:].join(" ").split(get_flags(["lan=", "l="], cmd[1:].join(" "))[0])[1].split(" ")[0]
      if not is_lan_ip(config.lan) then ;error_catch.push(head+": invalid lanIP...");return false;end if
    end if
    if flag.has(["-quiet", "-q"]) then temp.q=1

    return true
  end function
  if not init() then return {"status":0, "data":error_catch}


  //if not config.port then config.port=get_router(config.rhost).used_ports else config.port=grab_ports(config.rhost, config.port.split(","))
  ip.pub=config.rhost
  if not temp.q then command.safe_run("nmap", ["nmap", config.rhost])
  handle={}
  handle["-r"]=function()
    net=mx.net_use(config.rhost)
    if tp(config.lan) == "string" then config.third=config.lan
    config.lan=get_router(config.rhost).local_ip
    config.port=0;config.net=net

    if tp(config.net) != "NetSession" then return false
  end function
  handle["-s"]=function();config.scan=1;return true;end function;handle["-scan"]=@handle["-s"]
  handle["-c"]=function();config.change=1;return true;end function
  changes=get_flags(["-s", "-scan", "-r", "-c", "l=", "lan="], cmd[1:].join(" "), 1)
  for flag in changes
    if flag.search("l=") or flag.search("lan=") then ;config.third=flag.split("=")[1];continue;end if
    proxy=@handle[flag]
    if proxy() == 0 then;error_catch.push(head+": net session @ 'router' failed...");return {"status":0,"data":error_catch};end if
  end for

  if tp(config.net) == "NetSession" then execute(config.net, config.third, config.lan, config.scan, config.change)
  if tp(config.port) == "string" then;temp=grab_ports(config.rhost, config.port.split(","));if temp == [] then;error_catch.push(c("r")+head+": ports '"+config.port+"' not found...");return error_catch;end if;config.port=temp;end if
  if not config.port then config.port=grab_ports(config.rhost, [], 1)
  if tp(config.net) != "NetSession" then
    for i in config.port
      if i.is_closed then continue
      config.net=mx.net_use(config.rhost, i.port_number)//;print config
      if not tp(config.net) == "NetSession" then continue
      if tp(config.net) == "null" then continue
      config.lan=i.get_lan_ip
      execute(config.net, config.third, config.lan, config.scan, config.change)
    end for
  end if
  collect
  device.display_tree(1, 1)
end function
command["--r"]=@command.recon


command.nmap=function(cmd);error_catch=[];head=" "+cmd[0]
  init=function()
    if cmd.len < 2 then ;usage({"usage":[" nmap pubIP|domain"], "short":[" --n"], "note":[" -domain: www.facepalm.com"]});return false;end if
    if not is_valid_ip(cmd[1]) and (not is_valid_ip(nslookup(cmd[1]))) then ;error_catch.push(head+": '"+cmd[1]+"' invalid domain or ip address...");return false;end if
    if is_valid_ip(nslookup(cmd[1])) then cmd[1]=nslookup(cmd[1])
    if tp(get_router(cmd[1]))=="null" then;error_catch.push(head+": ip address not found...");return false;end if
    return true
  end function
  if not init() then return {"status":0, "data":error_catch}

  target_ip=cmd[1]
  router=get_router(target_ip)
  ports=router.used_ports
  print(c("b")+"scanning ports at: "+b+c("p")+target_ip+b2+"  "+c("b")+current_date+c0)
  if not ports.len then ;print b+("interrupted. no open ports...".color("black"))+c0;return {"status":0, "data":error_catch};end if
  info=[c("b")+"PORT STATE SERVICE VERSION LAN"];s=" "
  for p in ports
    service_info=router.port_info(p)
    lanip=p.get_lan_ip
    if p.is_closed then status=c("b")+"closed" else status=c("p")+"open"
    info.push(c("p")+p.port_number+s+status+s+service_info+s+lanip)
  end for
  info.format_columns;add_line
  return true
end function

command.find=function(cmd);error_catch=[];head=" "+cmd[0];temp={"file":0, "path":0, "name":0, "all":1, "infopoints":["-path"]}
  init=function()
    if (cmd.len < 2) then;info=usage({"usage":["find filePath|fileName|keyword info=-n,-c,-o,-g,-p,-s,-t"], "short":["--f"], "long":["info=-name,-content,-owner,-group,-perms,-size,-type"], "note":[" -capitalization is ignored for all inputs except 'info='", " -there is no order to filling in 'info='"]});return false;end if
    if cmd.hasIndex(2) then
      if not cmd[2:].join("").split("=").len > 1 then
        usage{"usage":[" find filePath|fileName|keyword =-n,-c,-o,-g,p,-s,-t"], "note":[" -using 'info=' or any text before the '=' symbol is optional."]}
        return false
      end if
      temp.infopoints=get_flags(["-n", "-name","-c", "-content","-o", "-owner","-g", "-group","-p", "-perms","-s", "-size","-t","-type"], cmd[2:].join("").lower, 1)
    end if
    if tp(temp.infopoints) == "list" and tp(temp.infopoints.indexOf("-path")) != "number" then temp.infopoints.push("-path")
    if not temp.infopoints then;error_catch.push(head+": invalid flag detected...");return false;end if

    if status.is_active then entry_file=device.current.mainf else entry_file=hc.File("/")
    temp.file=get_file(cmd[1], entry_file, 0, ["bool", "all"])
    if temp.file==[] or not temp.file then ;error_catch.push(parse_error(cmd[1], head+": file '"));return false;end if

    return true
  end function
  if not init() then return {"status":0, "data":error_catch}

  temp.infopoints=temp.infopoints.reverse
  handle=function(list, key)

    file=list[0];path=list[1];content=list[2];type=list[3];name=list[4];size=list[5];perms=list[6];own=list[7];grp=list[8]
    if key == "-t" then;if type == [0,0] then return b+("type: text".color("black"));if type == [1,1] then return b+("type: ".color("black")+"folder".color("purple"));if type == [0,1] then return b+("type: ".color("black")+"binary".color("white"));end if
    if key == "-c" and tp(file.get_content) == "string" then
      //if not tp(file.get_content) == "string" then return ""
      list=file.get_content.split(c10);newl=[]
      for line in list
        newl.push(b+(line.color("black black purple")))
      end for
      return b+("content: ".color("black"))+c10+newl.join(c10)+c10+"<size=9>"+b+("--end".color("black"))
    end if
    if key == "-n" then return b+("name: ".color("black")+name.color("purple"));if key == "-path" then return b+("path: ".color("black")+path.color("purple"));if key == "-p" then return b+("perms: ".color("black")+perms.color("purple"))
    if key == "-s" then return b+("size: ".color("black")+size.color("purple"));if key == "-o" then return b+("owner: ".color("black")+own.color("purple"));if key == "-g" then return b+("group: ".color("black")+grp.color("purple"))
  end function

  if tp(temp.file) == "list" then; result=""; paths=[]
    for file in temp.file;for i in temp.infopoints;res=handle(file, i);paths.push(file[0].path);result=result+res+c10;end for;if tp(res) == "string" then result=result+reveal(c10+c10, (res.split(":").len > 2), c10);end for
    while result[-1]==c10;result=result[:-1];end while
    print result+c10+c0
    return {"status":1, "data":paths}
  end if

  result=[]

  for i in temp.infopoints;result.push(handle([temp.file, temp.file.path, temp.file.get_content, [temp.file.is_folder, temp.file.is_binary], temp.file.name, temp.file.size, temp.file.permissions, temp.file.owner, temp.file.group], i));end for
  print result.join(c10)+c0

  return {"status":1, "data":temp.file.path}
  //objects.nf(objects.parse(objects.file.list), temp.path, temp.name, temp.all)

  //if theres more than one file, then return the first file in the list
  //if theres one file with multiple info points then return the file itself
  //if theres one file with a single info point then return the info point
end function
command["--f"]=@command.find

command.show = function(cmd)
  init = function()
    if cmd.hasIndex(1) and tp(["-h", "--h", "help"].indexOf(cmd[1])) == "number" then
      usage({"usage":["show"], "short":["--s"], "note":[" -must be run after [recon]"], "desc":[" -displays the current lanIP and username that blbx is connected to.", " -lists the machines that blbx can connect to by lanIP and username."]})
      return false
    end if

    return true
  end function
  if ip.lan == "127.0.0.1" then print(c("b")+b+"current: "+c("p")+"blbx"+"@"+ip.lan) else print(c("b")+b+"current: "+c("p")+user.current.name+"@"+ip.lan)
  if not user.current.hasIndex("pub") then
    ;network_piece="network: local".color("black")
  ;else
    ;network_piece="network: ".color("black")+user.current.pub.color("purple")
  ;end if
  printb(network_piece)

  device.display_tree(1, 1)

  return true
end function
command["--sh"]=@command.show

command.echo=function(cmd)
  init=function()
    if not cmd.hasIndex(1) then

    end if
    return true
  end function
  if not init() then return {"status":0, "data":[]}

  cmd=cmd[1:]
  print(c("b")+b+cmd.join(" ")+c0)
  return true
end function

command.decipher=function(cmd);error_catch=[];head=" "+cmd[0];temp={"hash":"", "db":1}
  init=function()
    if cmd.len < 2 then
      usage({"usage":[" decipher hash OPT: -scan"], "short":[" --d"], "note":["-blbx will find the hash in a string separated by ':'"]})
      return false
    end if

    flag=get_flags(["-s", "-scan"], cmd[1:].join(" "))
    if not flag then flag=[]
    if flag.len > 0 then temp.db=0
    if cmd[1].split(":").len > 1 then temp.hash=cmd[1].split(":")[1] else temp.hash=cmd[1]
    if ["", " "].has(temp.hash) then ;error_catch.push(head+": hash must not be empty...");return false;end if

    return true
  end function
  if not init() then return {"status":0, "data":error_catch}

  if temp.db then
    printb("searching...".color("black"));found=0
    for passwd in poly.get.dict
      if md5(passwd) == temp.hash then
        print notify(("found -> "+passwd).color("purple purple white"), "!", 0)+c0;add_line
        found=passwd;break
      end if
    end for
    if not found then ;print notify(("password not found").color("black black white"), "?", 0)+c0;add_line;return {"status":0, "data":error_catch};end if
    return {"status":1, "data":found}
  else
    printb("scanning...".color("black"))
    try=co.decipher(temp.hash)
    if not try then
      error_catch.push(head+": 'crypto.decipher' failed...")
      return {"status":0, "data":error_catch}
    end if
    print notify(("found -> "+try).color("purple purple white"), "!", 0)+c0;add_line
    if not tp(poly.get.dict.indexOf(try)) == "number" then
      DB.addTo([[try]], "dictionary")
      poly.get.dict.push(try)
    end if
    return {"status":1, "data":try}
  end if

end function
command["--d"]=@command.decipher

command.sweep=function(cmd);error_catch=[];head=" "+cmd[0];config={"ip":"", "ports":[]}
  init=function()
    if cmd.len < 2 or (cmd.hasIndex(1) and tp(cmd[1].to_int) != "number")  then
      usage({"usage":[" sweep int_amount OPT: int_port|int, int, int"],"short":[" --sw"], "desc":[" nmaps random ip address and prints to screen. you may specify ports by ',' separation."]})
      return false
    end if
    if cmd.hasIndex(2) then
        for port in cmd[2:].join(" ").split(",")
            if typeof(port.to_int) != "number" then continue
            config.ports.push(port.to_int)
        end for
    end if

    return true
  end function
  if not init then return {"status":0, "data":error_catch}

  count=cmd[1].to_int
  count_inc = -1

  while count_inc <= count
    count_inc = count_inc + 1
    pub_ip = ip.rnd
    if not get_router(pub_ip) then; count_inc = count_inc - 1;continue; end if
    ports = get_router(pub_ip).used_ports
    if not ports.len and cmd.len == 3 then; count_inc = count_inc - 1;continue; end if
    
    found = false;
    ports_arr = []
    for port in ports 
        if typeof(config.ports.indexOf(port.port_number)) != "number" then continue
        ports_arr.push(port.port_number)
        if ports_arr.len == config.ports.len then break
    end for
    found = (ports_arr.len == config.ports.len)

    if not found then; count_inc = count_inc - 1;continue; end if
    
    try=command.safe_run("nmap", ["nmap", pub_ip])
    add_line
  end while

end function
command["--sw"]=@command.sweep

command.pocket=function(cmd);error_catch=[];head=" "+cmd[0]
  init=function()
    if cmd.len < 2 or (cmd.len >= 2 and tp(["add", "-a", "remove", "-r", "clear", "-c", "show", "-s", "move", "-m", "use", "-u"].indexOf(cmd[1])) != "number") then
      usage({"usage":[" pocket -c", " pocket -a data commandName", " pocket -r commandName", " pocket -s", " pocket -m fromCommandName toCommandName"], "short":[" --p"], "long":[" clear, add, remove, show, move"], "desc":[" the pocket system controls pockets in each command where data can be stored. the pipe system uses the pocket system to share data between commands. use this command to manage your {pocket}.", ""], "note":[" -the 3rd box in the blbx prompt displays active pockets by command name, or just '$' when empty.", ""]})
      return false
    end if

    if tp(["add", "-a", "move", "-m"].indexOf(cmd[1])) == "number" and not cmd.hasIndex(3) then ;usage({"usage":[" pocket put data commandName"]});return false;end if
    if tp(["remove", "-r"].indexOf(cmd[1])) == "number" and not cmd.hasIndex(2) then ;usage({"usage":[" pocket remove commandName"]});return false;end if

    return true
  end function
  if not init() then return {"status":0, "data":error_catch}

  handle={};request=cmd[1]
  handle.clear=function();pocket.clear();return true;end function
  handle.add=function()
    data=cmd[2];cmd_name=cmd[3];if tp(data.to_int) == "number" then data=data.to_int
    if not pocket.has(cmd_name) then ;error_catch.push(c("r")+head+": command '"+cmd_name+"' not found in pocket system...");return {"status":0, "data":error_catch};end if
    pocket.add(data, cmd_name)
    return true
  end function
  handle.remove=function()
    cmd_name=cmd[2]
    if not pocket.has(cmd_name) then ;error_catch.push(c("r")+head+": command '"+cmd_name+"' not found in pocket system...");return {"status":0, "data":error_catch};end if
    pocket.rm(cmd_name)
    return true
  end function
  handle.show=function()
    if not pocket.summary.len then return true
    for i in pocket.summary()
      item=pocket.get(i);confirm=0
      //if tp(item) == "string" and item.split("/").len > 1 then ;item="path";confirm=1;end if
      if tp(item) == "string" and not item.split("/").len > 1 and item.len > 12 then ;item=item[:12]+"...";confirm=1;end if
      if not confirm then item=tp(item)
      print(notify(tp(item) , c("p")+i+ec)+c0)
    end for
    return true
  end function

  handle.use=function()// --p use cat
    if not pocket.summary.len then return true
    if not cmd.hasIndex(2) then ;usage({"usage":["pocket use commandName"]});return {"status":0, "data":error_catch};end if
    if not command.hasIndex(cmd[2]) then ;print cnf(cmd[2]);return {"status":0, "data":error_catch};end if
    try=command.safe_run(cmd[2], [cmd[2], pocket.grab(cmd[2])])
    if try.status then pocket.add(try, cmd[2])
  end function
  //handle.move=function()
    //if not pocket.summary.len then return true
    //if cmd.hasIndex(3) then
    //  from=pocket.get(cmd[2]);to=pocket.get(cmd[3])
    //
  //  else
  //    usage({"usage":[" pocket move fromCommandName toCommandName"]})
  //    return {"status":0, "data":error_catch}
//    end if
//   end function

  result=0
  if ["add", "-a"].indexOf(request) then result=handle.add()
  if ["remove", "-r"].indexOf(request) then result=handle.remove()
  if ["clear", "-c"].indexOf(request) then result=handle.clear()
  if ["show", "-s"].indexOf(request) then result=handle.show()
  if ["move", "-m"].indexOf(request) then result=handle.move()
  if ["use", "-u"].indexOf(request) then result=handle.use()
  if tp(result) == "map" then return result
end function
command["--p"]=@command.pocket

command.trojan=function(cmd);error_catch=[];head=" "+cmd[0];temp={"q":0}
  init=function()
    if not status.is_active then
      error_catch.push(head+": must [connect] to a target machine.")
      return false
    end if
    if cmd.len < 2 then
      usage({"usage":[" trojan -e user passwd", " trojan -d user amount", " trojan -b lanIP libName", " trojan -o|-s"], "short":[" --t"], "long":[" -escalate, -dictionary, -bounce, -own, -scan"], "note":[" -own: allows dia to add a machine to her network.", " -scan: will do a deep scan of the network from inside.", " -escalate: will produce a shell object from a user on the victim machine and hand it back to blbx", " -dictionary: does deep dictionary based on up to 300,000 passwords.", " -bounce: grabs computer and file objects from specific lanIP's in a router's network."]})
      return false
    end if
    type=["-e", "-escalate", "-d", "-dictionary", "-b", "-bounce", "-o", "-own"] // , "-s", "-scan"
    if tp(get_flags(type, cmd[1], 1).indexOf(cmd[1])) != "number" then ;error_catch.push(head+": invalid flag...");return false;end if

    flag=get_flags(["-quiet", "-q"], cmd[2:].join(" "), 1)
    if flag.has(["-quiet", "-q"]) then temp.q=1

    return true
  end function
  if not init() then return {"status":0, "data":error_catch}

  shell=objects.borrow("shell")
  if tp(shell) != "shell" then;error_catch.push(head+": no shell objects stored from this machine...");return {"status":0, "data":error_catch};end if
  comp=shell.host_computer;file=comp.File("/")

  printb("finding vulnerable directory...".c("black"))
  vd=device.get_vuln_dir()
  if tp(vd) != "file" then;error_catch.push(head+": no vulnerable directories found...");return {"status":0, "data":error_catch};end if
  printb("success: ".c("black black white") + vd.path.c("purple"))
  
  handle={"return_package":{"status":0, "data":error_catch}}
  handle.escalate=function(cmd);h=" trojan -e"
    ;name=0;//passwd=cmd[3]
    if not cmd.hasIndex(2) then cmd.push("root")
    for i in device.user_list[ip.lan]+["root", "guest"]
      if i.lower.search(cmd[2].lower) then ;name=i;break;end if
    end for
    if not name then ;error_catch.push(h+": user '"+cmd[2]+"' not found on target machine...");return {"status":0, "data":error_catch};end if
    if cmd.hasIndex(3) and cmd[3].len > 15 then return {"status":0, "data":b+(h+": passwd must be 1 to 15 chars in length...")}

    if cmd.hasIndex(3) then store=trojan.build("blbx_trojan_e.src", trojan.escalate, [shell, comp, file], name+" "+cmd[3]) else store=trojan.build("blbx_trojan_e.src", trojan.escalate, [shell, comp, file], name)
    if not store.status then ;return store;end if
    obj=get_custom_object()
    if tp(obj.callback) == "shell" then ;print objects.add(obj.callback, ip.lan);print collect;print notify("obtained shell from user '"+name+"'");else;error_catch.push(h+": incorrect password...");return {"status":0, "data":error_catch};end if
    if temp.q then store=command.safe_run("--c", ["--c", ip.lan, name, "-q"]) else store=command.safe_run("--c", ["--c", ip.lan, name])
    if tp(store) == "map" and not store.status then ;error_catch=store.data;return {"status":0, "data":error_catch};end if
    return {"status":1, "data":obj.callback}
  end function
  handle["-e"]=@handle.escalate
  handle["-escalate"]=@handle.escalate

  handle.dictionary=function(cmd);h=" trojan -d"
    //" trojan -dictionary user"
    name=0
    if not cmd.hasIndex(2) then cmd.push("root")
    for i in device.user_list[ip.lan]+["root", "guest"]
      if i.lower.search(cmd[2].lower) then ;name=i;break;end if
    end for
    if not name then name=cmd[2]//;error_catch.push(h+": user '"+cmd[2]+"' not found on target machine...");return {"status":0, "data":error_catch};end if

    store=trojan.build("blbx_trojan_d.src", trojan.dict, [shell, comp, file], name)
    if not store.status then ;return store;end if
    obj=get_custom_object()
    if tp(obj.callback) == "string" then ;print notify((name+" --> "+obj.callback).color("purple purple white"), "!", 0)+c0;return {"status":1, "data":obj.callback};else;print notify((" "+name+" --> password not found ").color("black black white"), "?", 0);return {"status":0, "data":error_catch};end if
  end function
  handle["-d"]=@handle.dictionary
  handle["-dict"]=@handle.dictionary
  handle["-dictionary"]=@handle.dictionary

  handle.bounce=function(cmd);h=" trojan -b"
    //usage: trojan -b lanIP libName OPT: -s
    //if ip.lan != get_router(ip.pub).local_ip then ;error_catch.push(h+": must [connect] to a router...");return handle.return_package; end if
    if not cmd.hasIndex(2) then ;usage({"usage":[" trojan -bounce lanIP libName"]});return handle.return_package; end if
    if not cmd.hasIndex(3) then cmd.push("init")
    lib_found=0
    for i in ["init.so", "net.so", "aptclient.so", "kernel_module.so", "kernel_router.so", "crypto.so", "metaxploit.so"]
      if typeof(i.lower.indexOf(cmd[3])) == "number" then 
        lib_found = i
        break
      end if
    end for
    if not lib_found then ;error_catch.push(h+": invalid library...");return {"status":0, "data":error_catch};end if
    if not is_lan_ip(cmd[2]) then ;error_catch.push(h+": invalid local ip...");return {"status":0, "data":error_catch};end if
    //code=trojan.bounce.replace(";", c10)
    //".blbx_trojan_b.src"
    fmx=objects.nf(comp.File("/"), 0, "metaxploit.so")
    lmx=objects.nf(hc.File("/"), 0, "metaxploit.so")
    delete_mx=0;local_lib=0;delete_lib=0
    local_lib=0
    if not fmx then
      if not temp.q then
        add_line
        printb("missing 'metaxploit.so'...".color("black"))
        printb("sending...".color("purple purple black"))
      end if
      
      if tp(vd) != "file" then
        error_catch.push(h+": no vulnerable directories found...")
        return handle.return_package
      end if

      try=gs.scp(lmx.path, vd.path, shell)
      if tp(try) == "string" and try.len > 0 then ;error_catch.push(parse_error(try, h+": ", 0));return {"status":0, "data":error_catch};end if
      delete_mx=1
      fmx=objects.nf(comp.File("/"), vd.path+"/metaxploit.so")
    end if
    delete_mx=1
    lib=objects.nf(comp.File("/"), 0, lib_found)
    if not lib then
      if not temp.q then
        add_line
        printb(("target library '"+lib_found+"' not found...").color("black"))
        printb("planting library...".color("black"))
      end if
      local_lib=objects.nf(hc.File("/"), 0, lib_found)
      if tp(local_lib) != "file" then
        error_catch.push(head+": '"+lib_found+"' not found on local machine...")
        return {"status":0, "data":error_catch}
      end if
      dest=shell.host_computer.File("/lib")
      if not tp(dest) == "file" then
        error_catch.push(head+": could not find '/lib' directory...")
        return {"status":0, "data":error_catch}
      end if
      try=gs.scp(local_lib.path, dest.path, shell)
      //announce("perms", dest.permissions)
      //announce("user", objects.get_user(shell))
      //announce("check_point", try)
      if tp(try) == "string" and try.len > 0 then ;error_catch.push(parse_error(try, h+": ", 0));return {"status":0, "data":error_catch};end if
      delete_lib=1
      lib=objects.nf(comp.File("/"), 0, lib_found)
    end if
    ip.lanList.push(cmd[2])
    poly.get.data={"lib":lib_found, "lan":cmd[2], "db":0, "scan":0}
    poly.get.data.db=DB.extract_map("exploit")
    if cmd[1:].join(" ").search("-s") or cmd[1:].join(" ").search("-scan") then poly.get.data.scan=1

    store=trojan.build("blbx_trojan_b.src", trojan.bounce, [shell, comp, file])
    if not store.status then ;return store;end if

    if delete_mx then fmx.delete
    if local_lib != 0 then local_lib.delete

    obj=get_custom_object()
    if not obj.callback then ;if obj.hasIndex("msg") then ;error_catch.push(h+": "+obj.msg);return {"status":0, "data":error_catch};end if;end if
    if obj.callback.hasIndex("platter") and obj.callback.platter.exploit.len > 0 then add_exploit(obj.callback.platter.exploit, obj.data.lib, 0)
    objects.shell.list=objects.shell.list+obj.callback.platter.objects.shell.list
    objects.computer.list=objects.computer.list+obj.callback.platter.objects.computer.list
    objects.file.list=objects.file.list+obj.callback.platter.objects.file.list
    objects.number.list=objects.number.list+obj.callback.platter.objects.number.list
    collect()
    combine=obj.callback.platter.objects.shell.list+obj.callback.platter.objects.computer.list+obj.callback.platter.objects.file.list+obj.callback.platter.objects.number.list
    if not temp.q then
      print notify(("'".color("white")+ip.lan.color("black")+"'".color("white"))+" --> "+("'".color("white")+obj.data.lan.color("black")+"'".color("white")))+c0
      print notify("bounce exploit collected "+("'"+combine.len+"'").color("black black white")+" objects", reveal("?", (not combine.len), "!"))+c0
    end if
  end function
  handle["-b"]=@handle.bounce
  handle["-bounce"]=@handle.bounce

  proxy=handle[cmd[1]]
  result=proxy(cmd)
  //print result
  if tp(result) == "map" and result.hasIndex("status") and not result.status then
    error_catch=result.data
    return {"status":0, "data":error_catch}
  end if

  save=clear_logs
  if not temp.q then ;print reveal(save+"...", (save[-1]!="."), save);add_line; end if


end function
command["--tr"]=@command.trojan

command.nano=function(cmd);error_catch=[];head=" "+cmd[0];temp={"file":0}
  init=function()
    if cmd.len < 2 then ;usage({"usage":[" nano filePath"], "short":[" --n"], "note":[" -[nano] is not a command for file creation. use [touch] to create new files."]});return false;end if
    if status.is_active then entry_file=device.current.mainf else entry_file=hc.File("/")

    temp.file=get_file(cmd[1], entry_file)
    if not temp.file then ;error_catch.push(parse_error(cmd[1]+"'", head+": file '"));return false;end if
    if tp(temp.file) == "string" then ;print temp.file;return false;end if
    if not temp.file.has_permission("r") or not temp.file.has_permission("w") then ;error_catch.push(head+": permission denied...");return false;end if

    return true
  end function
  if not init() then return {"status":0, "data":error_catch}


  displayMod=temp.file.get_content.split(c10)

  nano={}
  nano.boot_cli_module
  nano.rm=function(cmd);head=" "+cmd[0];msg=""
    init=function()
      if cmd.len != 2 then
        return nano.display.usage({"usage":[" rm 4,2,6|3"], "note":[" -line numbers do not have to be listed in order."]})
      end if
      return true
    end function
    try=init()
    if tp(try) == "string" then return {"status":0, "msg":try}
    if cmd[1].search("*") then nano.display.remove(range(0,nano.display.module.len-1).join(",")) else nano.display.remove(cmd[1])
    return {"status":0, "msg":msg}
  end function

  nano[".."]=function(cmd);msg=""
    nano.display.undo
    return {"status":1, "msg":msg}
  end function
  nano["."]=function(cmd);msg=""
    nano.display.redo
    return {"status":1, "msg":msg}
  end function

  nano[">"]=function(cmd);head=cmd[0];msg=""
    init=function()
      if cmd.len > 1 then
        if tp(cmd[1].to_int) == "string" then
          return nano.display.usage({"usage":[" > ", " > PageNum"]})
        end if
        if (tp(cmd[1].to_int) == "number" and not nano.display.module.group.hasIndex(cmd[1].to_int)) then
          return "error: page '"+cmd[1]+"' not found...".color("red")
        end if
      end if
      return true
    end function
    try=init()
    if tp(try) == "string" then return {"status":0, "msg":try}
    if cmd.hasIndex(1) and cmd[1].to_int < 0 then cmd[1]=str(0)
    if cmd.hasIndex(1) then nano.display.set_page(cmd[1].to_int) else nano.display.next_page
    return {"status":1, "msg":msg}
  end function;nano["+"]=@nano[">"]
  nano["<"]=function(cmd);msg=""
    nano.display.prev_page
    return {"status":1, "msg":msg}
  end function;nano["-"]=@nano["<"]

  nano.replace=function(cmd);msg=""
    init=function()
      if cmd.len < 2 then
        return nano.display.usage({"usage":[" replace 2,3,4|5 input"]})
      end if
      if not cmd.hasIndex(2) then cmd.push("")
      cmd[2]=cmd[2:].join(" ")
      return true
    end function
    try=init()
    if tp(try) == "string" then return {"status":0, "msg":try}
    if cmd[1].search("*") then nano.display.replace(range(0,nano.display.module.len-1).join(","), cmd[2]) else nano.display.replace(cmd[1], cmd[2])
    return {"status":1, "msg":msg}
  end function
  nano.rep=@nano.replace
  nano.insert=function(cmd);head=cmd[0];msg=""
    init=function()
      if cmd.len < 2 then
        return nano.display.usage({"usage":[" insert 3 input"]})
      end if
      if tp(cmd[1].to_int) != "number" then
        return (head+": line '"+cmd[1]+"' not found...").color("red")
      end if
      if not cmd.hasIndex(2) then cmd.push("")
      cmd[2]=cmd[2:].join(" ")
      return true
    end function
    try=init()
    if tp(try) == "string" then return {"status":0, "msg":try}
    nano.display.insert(cmd[1].to_int, cmd[2])
    return {"status":0, "msg":msg}
  end function
  nano.find=function(cmd);head=cmd[0];msg=""
    init=function()
      if cmd.len < 2 then
        return nano.display.usage({"usage":[" find text"]})
      end if
      cmd[1]=cmd[1:].join(" ")
      return true
    end function
    try=init()
    if tp(try) == "string" then return {"status":0, "msg":try}
    ind_list=nano.display.find(cmd[1])
    if ind_list.len > 25 then ind_list=ind_list[:25].join(", ")+"..." else ind_list=ind_list.join(", ")
    return {"status":0, "msg":("found at indexes: "+ind_list).color(nano.display.cs)}
  end function
  //nano.save=//@nano.back
  res=nano.run_cli_module("nano", next+box("nano")+wisp+box("{{{{{{{}}}}}}}")+next+wisp+box("#")+"> "+c("b"), ": command not found!".color("black"), displayMod)
  if res!=temp.file.get_content.split(c10) then
    try=temp.file.set_content(res.join(c10))
    if tp(try) == "string" then ;error_catch.push(parse_error(try, head+": "));return {"status":0, "data":error_catch};end if
    if try == 0 then ;error_catch.push(head+": change prohibited. file is protected...");return {"status":0, "data":error_catch};end if
    print notify("file changes in "+("'"+temp.file.name+"'").color("black black white")+" saved")
  end if
  return {"status":1, "data":res}
end function

command.macro=function(cmd);error_catch=[];head=" "+cmd[0]
  init=function()
    //usage:
    // macro -new|-open|-rm name
    if cmd.len < 3 then
      usage({"usage":[" macro -n|-o|-r name"], "short":[" --m"], "long":[" -new, -open, -remove|-rm"], "desc":["macros are command chains that are stored locally for blbx to re-use on command. reference a macro by name with an '@' prefix.", "example: @quickAttack = --r rh=1.1.1.1 p=80 : --c 192.168.12.3 root : find etc/passwd >| : find |> cat"]})
      return false
    end if
    if tp(["-n", "-new", "-o", "-open", "-r", "-rm", "-remove"].indexOf(cmd[1])) != "number" then
      error_catch.push((head+": invalid flag...").color("red"))
      return false
    end if
    while cmd[2][0]=="@";cmd[2]=cmd[2][1:];end while
    db_em=misc.macro_db_map
    if tp(["-n", "-new"].indexOf(cmd[1])) != "number" and (not db_em.len or (db_em.len > 0 and not db_em.hasIndex(cmd[2]))) then
      error_catch.push((head+": macro '"+cmd[2]+"' not found...").color("red"))
      return false
    end if
    if tp(["-n", "-new"].indexOf(cmd[1])) == "number" then
      found=[]
      for i in "!@#$%^&*()+-={}[]\|:;'<>,/?"+""""//'_' and '.' are allowed
        if cmd[2].search(i) then found.push(i)
      end for
      if found.len > 0 then
        error_catch.push(b+(head+" -new: names must be alphanumeric...").color("red"))
        return false
      end if

      if db_em.hasIndex(cmd[2]) then
        error_catch.push(b+(head+" -new: macro '"+cmd[2]+"' already exists...").color("red"))
        return false
      end if
      //if cmd[2]
    end if
    return true
  end function
  if not init() then return {"status":0, "data":error_catch}
  //infopoints=get_flag(["-n", "-new", "-o", "-open", "-r", "-rm", "-remove"], cmd[1])
  displayMod=[]
  if tp(["-n", "-new"].indexOf(cmd[1])) == "number" then
    displayMod=[]
  end if
  if tp(["-o", "-open"].indexOf(cmd[1])) == "number" then
    displayMod=misc.macro_db_map[cmd[2]].values
  end if
  if tp(["-r", "-rm", "-remove"].indexOf(cmd[1])) == "number" then
    if cmd[2].search("*") then
      DB.reset("macro")
      print notify("macro db has been cleared", "success")
      return {"status":0, "data":error_catch}
    end if

    m=misc.macro_db_map;new_m={}
    for i in m
      //print (i.key+" : "+cmd[2]).color("white")
      if i.key.lower == cmd[2].lower then continue
      new_m[i.key]=i.value
    end for
    //print new_m
    DB.set(new_m, "macro")
    print notify("removed "+("'"+cmd[2]+"'").color("black black white")+" from macro db", "success")
    return {"status":0, "data":error_catch}
  end if
  name=cmd[2]

  macro={};macro.boot_cli_module
  macro.rm=function(cmd);head=" "+cmd[0];msg=""
    init=function()
      if cmd.len != 2 then
        return macro.display.usage({"usage":[" rm 4,2,6|3"], "note":[" -line numbers do not have to be listed in order."]})
      end if
      return true
    end function
    try=init()
    if tp(try) == "string" then return {"status":0, "msg":try}
    if cmd[1].search("*") then macro.display.remove(range(0,macro.display.module.len-1).join(",")) else macro.display.remove(cmd[1])
    return {"status":0, "msg":msg}
  end function

  macro[".."]=function(cmd);msg=""
    macro.display.undo
    return {"status":1, "msg":msg}
  end function
  macro["."]=function(cmd);msg=""
    macro.display.redo
    return {"status":1, "msg":msg}
  end function

  macro[">"]=function(cmd);head=cmd[0];msg=""
    init=function()
      if cmd.len > 1 then
        if tp(cmd[1].to_int) == "string" then
          return macro.display.usage({"usage":[" > ", " > PageNum"]})
        end if
        if (tp(cmd[1].to_int) == "number" and not macro.display.module.group.hasIndex(cmd[1].to_int)) then
          return "error: page '"+cmd[1]+"' not found...".color("red")
        end if
      end if
      return true
    end function
    try=init()
    if tp(try) == "string" then return {"status":0, "msg":try}
    if cmd.hasIndex(1) and cmd[1].to_int < 0 then cmd[1]=str(0)
    if cmd.hasIndex(1) then macro.display.set_page(cmd[1].to_int) else macro.display.next_page
    return {"status":1, "msg":msg}
  end function;macro["+"]=@macro[">"]
  macro["<"]=function(cmd);msg=""
    macro.display.prev_page
    return {"status":1, "msg":msg}
  end function;macro["-"]=@macro["<"]

  macro.replace=function(cmd);msg=""
    init=function()
      if cmd.len < 2 then
        return macro.display.usage({"usage":[" replace 2,3,4|5 input"]})
      end if
      if not cmd.hasIndex(2) then cmd.push("")
      cmd[2]=cmd[2:].join(" ")
      return true
    end function
    try=init()
    if tp(try) == "string" then return {"status":0, "msg":try}
    if cmd[1].search("*") then macro.display.replace(range(0,macro.display.module.len-1).join(","), cmd[2]) else macro.display.replace(cmd[1], cmd[2])
    return {"status":1, "msg":msg}
  end function
  macro.rep=@macro.replace
  macro.insert=function(cmd);head=cmd[0];msg=""
    init=function()
      if cmd.len < 2 then
        return macro.display.usage({"usage":[" insert 3 input"]})
      end if
      if tp(cmd[1].to_int) != "number" then
        return (head+": line '"+cmd[1]+"' not found...").color("red")
      end if
      if not cmd.hasIndex(2) then cmd.push("")
      cmd[2]=cmd[2:].join(" ")
      return true
    end function
    try=init()
    if tp(try) == "string" then return {"status":0, "msg":try}
    macro.display.insert(cmd[1].to_int, cmd[2])
    return {"status":0, "msg":msg}
  end function
  macro.find=function(cmd);head=cmd[0];msg=""
    init=function()
      if cmd.len < 2 then
        return macro.display.usage({"usage":[" find text"]})
      end if
      cmd[1]=cmd[1:].join(" ")
      return true
    end function
    try=init()
    if tp(try) == "string" then return {"status":0, "msg":try}
    ind_list=macro.display.find(cmd[1])
    if ind_list.len > 25 then ind_list=ind_list[:25].join(", ")+"..." else ind_list=ind_list.join(", ")
    return {"status":0, "msg":("found at indexes: "+ind_list).color(macro.display.cs)}
  end function
  prompt=next+box("macro")+wisp+box("{{{{{{{}}}}}}}")+next+box("#")+"> "

  store=macro.run_cli_module("macro", prompt, ": command not found!".color("black"), displayMod);ps_map={};ind=-1
  if not store.clean([" ", ""]).len then
  for i in store;ind=ind+1
    ps_map[ind]=i
  end for


  sv=misc.macro_db_map
  if ps_map.values.clean(["", " "]).len > 0 then ;sv[cmd[2]]=ps_map;DB.addTo(sv, "macro");print notify("changes to macro "+("'"+cmd[2]+"'").color("black black white")+" saved");end if
  add_line
end function
command["--m"]=@command.macro

command.whois=function(cmd);error_catch=[];head=" "+cmd[0]
  init=function()
    if status.is_active then cmd.push(ip.pub) else cmd.push(hc.public_ip)
    try=is_valid_ip(cmd[1])
    if not try then
      try=is_valid_ip(nslookup(cmd[1]))
      if not try then ;error_catch.push((head+": invalid ip address or domain..."));return false;end if
    end if
    return true
  end function
  if not init() then return {"status":0, "data":error_catch}
  ip=cmd[1]
  output=whois(ip);new_output=[]
  for i in output.split(c10)
    temp=i.lower
    fir=temp.split(": ")[0];sec=temp.split(": ")[1]
    if fir.search("admin") then fir = "admin contact"
    new_output.push(b+(fir+": ").color("black")+sec.color("black purple purple"))
  end for
  print new_output.join(c10)+c10
end function

command.start=function(cmd);error_catch=[];head=" "+cmd[0]
  init=function()
    if not status.is_active then
      error_catch.push(head+": must [connect] to a victim to start a terminal connection...")
      return false
    end if

    if not objects.shell.list.len then ;error_catch.push(head+": no shell objects stored...");return false;end if
    if not tp(objects.parse(objects.shell.list, ip.lan)) == "shell" then ;error_catch.push(head+": no shell objects from '"+ip.lan+"' stored...");return false;end if

    return true
  end function
  if not init() then return {"status":0, "data":error_catch}
  print notify("starting terminal on '"+ip.pub+"' @ '"+ip.lan+"'")
  try=objects.parse(objects.shell.list, ip.lan).start_terminal
  if tp(try) == "string" then; error_catch.push(parse_error(try, head+": ", 0));return {"status":0, "data":error_catch};end if

end function

command.get=function(cmd);error_catch=[];head=" "+cmd[0];temp={"file":0, "dest":0}
  init=function()
    if cmd.len < 2 then ;usage({"usage":[" get fileName|filePath|keyword localPath", " get fileName|filePath|keyword OPT: -r"], "note":[" -when 'localPath' is omitted, your current local path is used."], "short":[" --g"]});return false;end if
    if not cmd.hasIndex(2) then cmd.push(nav.localDir)
    if not status.is_active then ;error_catch.push(head+": must [connect] to a target to use this command...");return false;end if

    temp.file=get_file(cmd[1], device.current.mainf)
    if not temp.file then ;error_catch.push(parse_error(cmd[1], head+": '"));return false;end if
    if tp(temp.file) == "string" then ;print temp.file;return false;end if

    if cmd[2].split("/").len == 1 then ;error_catch.push(head+": destination must be a path...");return false;end if
    temp.dest=get_file(cmd[2], hc.File("/"))
    if not temp.dest then ;error_catch.push(parse_error(cmd[2], head+": '"));return false;end if

    return true
  end function
  if not init() then return {"status":0, "data":error_catch}

  spread=[temp.file.is_folder, temp.file.is_binary]
  if tp(spread.indexOf(1)) != "number" then
    hc.touch(temp.dest.path, temp.file.name)
    tempf=hc.File(temp.dest.path+"/"+temp.file.name)
    try=tempf.set_content(temp.file.get_content)
    if tp(try) != "string" then
      success
      return {"status":1, "data":tempf.path}
    end if
  end if
  if not user.current.s then
    error_catch.push(head+": no shell objects from user '"+user.current.name+"' stored...")
    return {"status":0, "data":error_catch}
  end if
  shell=user.current.s
  try=shell.scp(temp.file.path, temp.dest.path, gs)
  if tp(try) == "string" then ;error_catch.push(parse_error(try, head+": ", 0));return {"status":0, "data":error_catch};end if
  success
end function
command["--g"]=@command.get

command.send=function(cmd);error_catch=[];head=" "+cmd[0];temp={"file":0, "dest":0}
  init=function()
    if cmd.len < 2 then ;usage({"usage":[" send fileName|filePath|keyword remotePath", " send fileName|filePath|keyword OPT: -r"], "note":[" -when 'remotePath' is omitted, your current remote path is used."], "short":[" --sd"]});return false;end if
    if not cmd.hasIndex(2) then cmd.push(nav.remoteDir)
    if not status.is_active then ;error_catch.push(head+": must [connect] to a target to use this command...");return false;end if

    temp.file=get_file(cmd[1], hc.File("/"))
    if not temp.file then ;error_catch.push(parse_error(cmd[1], head+": '"));return false;end if
    if tp(temp.file) == "string" then ;print temp.file;return false;end if

    if cmd[2].split("/").len == 1 then ;error_catch.push(head+": destination must be a path...");return false;end if
    temp.dest=get_file(cmd[2], device.current.mainf)
    if not temp.dest then ;error_catch.push(parse_error(cmd[2], head+": '"));return false;end if

    return true
  end function
  if not init() then return {"status":0, "data":error_catch}

  if not user.current.s then
    error_catch.push(head+": no shell objects from user '"+user.current.name+"' stored...")
    return {"status":0, "data":error_catch}
  end if
  shell=user.current.s
  try=gs.scp(temp.file.path, temp.dest.path, shell)
  if tp(try) == "string" then ;error_catch.push(parse_error(try, head+": ", 0));return {"status":0, "data":error_catch};end if
  success
end function
command["--sd"]=@command.send

command.logs=function(cmd)
  sv=clear_logs(1)
  if tp(sv) == "string" then print sv+c10+c0
end function
command["--l"]=@command.logs

command.migrate=function(cmd);error_catch=[];head=" "+cmd[0];temp={"flag":0}
  init=function()
    if not status.is_active then
      error_catch.push(head+": must [connect] to a victim...")
      return false
    end if
    flagl=get_flags(["-s", "-start"], cmd[1:].join(" "))
    if tp(flagl) == "list" and flagl.len > 0 then temp.flag=1

    return true
  end function
  if not init then return {"status":0, "data":error_catch}
  if not tp(objects.borrow("shell")) == "shell" then
    error_catch.push(head+": no shell objects from victim machine stored...")
    return {"status":0, "data":error_catch}
  end if
  if not user.current.s then name=objects.get_user(objects.borrow("shell")) else name=user.current.name

  sv=action.migrate(ip.lan, name, temp.flag)
  add_line
  if not sv.status then
    error_catch.push(head+": "+sv.data)
    return {"status":0, "data":error_catch}
  end if
  poly.get.migration.status=1
end function
command["--mg"]=@command.migrate

command.run=function(cmd);error_catch=[];head=" "+cmd[0];temp={"file":0, "params":0}
  init=function()
    if cmd.len < 2 then ;usage({"usage":["run fileName|filePath|keyword OPT: params=|p=..."]});return false;end if
    if status.is_active then entry_file=device.current.mainf else entry_file=hc.File("/")

    temp.file=get_file(cmd[1], entry_file)
    if not tp(temp.file) == "file" then ;error_catch.push(parse_error(cmd[1], head+": "));return false;end if
    if tp(temp.file) == "string" then ;print temp.file;return false;end if

    flag=get_flags(["p=", "params="], cmd[1:].join(" "))
    if tp(flag) == "list" and flag.len > 0 then temp.params=cmd[1:].join(" ").split(flag[0])[1] //this cleverly grabs the params if they are provided.

    return true
  end function
  if not init then return {"status":0, "data":error_catch}

  if status.is_active then shell=objects.borrow("shell") else shell=gs
  if not tp(shell) == "shell" then ;error_catch.push(head+": no shell objects from victim machine stored...");return {"status":0, "data":error_catch};end if

  if not temp.params then try=shell.launch(temp.file.path) else try=shell.launch(temp.file.path, temp.params)
  if tp(try) == "string" and try.len > 0 then ;error_catch.push(parse_error(try, head+": ", 0));return {"status":0, "data":error_catch};end if
  //print tp(try)
  add_line
end function

command.users=function(cmd);error_catch=[];head=" "+cmd[0]
  init=function()
    //if not status.is_active then ;error_catch.push(head+": must [connect] to a victim...");return false;end if
    return true
  end function
  if not init then return {"status":0, "data":error_catch}
  collect()
  print device.display_tree+c10
end function
command["--u"]=@command.users

command.bank=function(cmd);error_catch=[];head=" "+cmd[0];temp={"q":0}
  init=function()
    if not status.is_active then ;error_catch.push(head+": must [connect] to a victim...");return false;end if

    file=objects.borrow("file")
    if not file then ;error_catch.push(head+": no file objects from victim device stored...");return false;end if

    flag=get_flags(["-quiet", "-q"], cmd[1:].join(" "), 1)
    if flag.has(["-quiet", "-q"]) then temp.q=1

    return true
  end function
  if not init then return {"status":0, "data":error_catch}

  file=objects.borrow("file")
  fl=objects.nf(file, 0, "bank.txt", 1);found=[]
  if not fl.len then ;error_catch.push(head+": no bank accounts found on this device...");return {"status":0, "data":error_catch};end if

  for i in fl
    if i[0].is_binary then continue
    if tp(i[0].get_content) != "string" then continue
    contents=i[0].get_content.split(c10).clean(["", " "]).join(c10)
    if contents.split(":").len == 1 then continue
    found.push(contents)
  end for
  if found.len > 0 then
    for i in found;if tp(poly.get.bank.indexOf(i)) == "number" then continue;printb(i.color("black black purple"));poly.get.bank.push(i);DB.addTo([[i]], "bank");end for
  end if
  if not temp.q then add_line
  return {"status":1, "data":found}
end function
command["--b"]=@command.bank

command.mail=function(cmd);error_catch=[];head=" "+cmd[0]
  init=function()
    if not status.is_active then
      error_catch.push(head+": must [connect] to a victim...")
      return false
    end if
    file=objects.borrow("file")
    if not file then
      error_catch.push(head+": no file objects from victim device stored...")
      return false
    end if

    return true
  end function
  if not init then return {"status":0, "data":error_catch}

  file=objects.borrow("file")
  fl=objects.nf(file, 0, "mail.txt", 1)
  fl=objects.nf(device.current.mainf, 0, "mail.txt", 1);found=[]
  if not fl.len then ;error_catch.push(head+": no mail accounts found on this device...");return {"status":0, "data":error_catch};end if

  for i in fl
    if i[0].is_binary then continue
    if tp(i[0].get_content) != "string" then continue
    contents=i[0].get_content.split(c10).clean(["", " "]).join(c10)
    if contents.split(":").len == 1 then continue
    found.push(contents)
  end for
  if found.len > 0 then
    for i in found;if tp(poly.get.mail.indexOf(i)) == "number" then continue;printb(i.color("black black purple"));poly.get.mail.push(i);DB.addTo([[i]], "mail");end for
  end if

  return {"status":1, "data":found}
end function
command["--m"]=@command.mail

command.farm=function(cmd);error_catch=[];head=" "+cmd[0]
  init=function()
    if not cmd.hasIndex(1) or (cmd.hasIndex(1) and cmd[1].to_int <= 0) then
      usage({"usage":["farm int"]})
      return false
    end if
    if tp(cmd[1].to_int) != "number" then cmd[1]="10"
    if cmd[1].to_int > 500 then cmd[1]="500"

    return true
  end function
  if not init then return {"status":1, "data":error_catch}
  count=cmd[1].to_int;total=[]

  while count > 0
    new_ip=ip.rnd()
    command.safe_run("wipe", ["wipe"])
    try=command.safe_run("--r", ["--r", "rh="+new_ip])
    if tp(try) == "map" and try.hasIndex("status") and not try.status then continue
    if not device.tree.indexes.len then continue
    cs

    for lanip in device.tree.indexes
      if status.is_active then command.safe_run("--dc", ["--dc"])
      test_shell=objects.parse(objects.shell.list, lanip);found=[]

      if not tp(test_shell) == "shell" then continue
      username=objects.get_user(test_shell)
      try=command.safe_run("--c", ("--c "+lanip+" "+username).split(" "))

      if tp(try) == "map" and try.hasIndex("data") and try.data[0].lower.search("already connected") then continue
      if (tp(try) == "map" and try.hasIndex("data") and try.data[0].lower.search(" in user tree")) and not ip.lan==lanip then continue

      if user.current.name != "root" then
        try=command.safe_run("--tr", ["--tr", "-e"])
        if tp(try) != "null" then continue
      end if

      try=command.safe_run("--b", ["--b"])
      found=found+try.data

      compare=(total+found).remove_repeats
      if compare.len==total.len then continue
      total=compare
    end for
    if not total.len then continue
    count=count-1
    wait(5)
  end while
  cs
  show_prompt(command, cmd)
  printb(("        results:".color("purple black black")))
  print bar(25)
  printb((" accounts found: "+str(total.len)).color("black purple black"))
  add_line
end function
command["--fa"]=@command.farm

command.update=function(cmd);error_catch=[];head=" "+cmd[0]
  sources=apt_sources_map.sourceList.indexes
  aptclient.install("metaxploit.so", "/root/blackbox")
  aptclient.install("crypto.so", "/root/blackbox")
  add_line
  for i in ["/root/blackbox/metaxploit.so", "/root/blackbox/crypto.so"]
    print(b+("*** "+("'"+i+"'").color("black black white")+" updated! ***").color("purple")+c0)
  end for
  add_line
  mx=get_library("metaxploit.so")
  co=get_library("crypto.so")
end function
command["--up"]=@command.update

command["apt-get"]=function(cmd);error_catch=[];head=" "+cmd[0];temp={"op_type":0}
  init=function()
    if cmd.len < 2 then
      usage({"usage":[" apt -i program_name", "apt -sc program_name", "apt -sh repo_address", "apt -ar repo_address port", "apt -dr repo_address", "apt -upd", "apt -upg directory"], "long":[" -install, -search, -show, -addrepo, -delrepo, -update, -upgrade"]})
      return false
    end if
    if not status.is_active then ;error_catch.push(head+": must [connect] to a target to use this command...");return false;end if
    options=["-install", "-i", "-search", "-sc", "-show", "-sh", "-addrepo", "-ar", "-delrepo", "-dr", "-update", "-upd", "-upgrade", "-upg"]
    type=get_flags(options, cmd[1:].join(" "))
    if not type then ;error_catch.push(head+": invalid flag...");return false;end if
    temp.op_type=type[0]

    return true
  end function
  if not init then return {"status":0, "data":error_catch}

  if status.is_active then ;shell=objects.borrow("shell");else;shell=gs;end if
  if not tp(shell) == "shell" then ;error_catch.push(head+": no shell objects stored from victim...");return {"status":0, "data":error_catch};end if
  comp=shell.host_computer
  file=comp.File("/")

  handle={}
  handle["-upgrade"]=function(cmd);h=head+" -upgrade"
    if not cmd.hasIndex(2) then cmd.push("/lib")
    target_folder=get_file(cmd[2], file)
    if tp(target_folder) != "file" then ;error_catch.push(h+": directory '/lib' not found...");return {"status":0, "data":error_catch};end if

    found=[]
    for i in target_folder.get_files ;if not i.is_binary then continue;if i.name.lower.search("lib") then continue;if "init.so kernel_module.so net.so".search(i.name.lower) then continue;output = aptclient.check_upgrade(i.path);if not output then continue;if tp(output) == "string" and output.len > 0 then continue;found.push(i.name); end for
    if not found.len then ;error_catch.push(h+": no package is available for upgrading...");return {"status":0, "data":error_catch};end if
    printb(("reading packages from '"+target_folder.path+"'...").color("black"))
    printb("available: ".color("black")+format_list(found))

    printb("will you continue?".color("black"))
    op=ui(box("blbx")+wisp+box("y/n")+"> ".color("purple")+c("b"))
    spread=[op.lower.search("y"), op.lower.search("n")]
    while spread[0]+spread[1] != 1
      op=ui(box("blbx")+wisp+box("y/n")+"> ".color("purple")+c("b"))
      spread=[op.lower.search("y"), op.lower.search("n")]
    end while
    add_line
    if spread[1] then return {"status":0, "data":error_catch}
    report=[]
    for file in found
      try=aptclient.install(file)
      if tp(try) == "string" then report.push(b+((file+": ").color("black")+parse_error(try.lower, 0, 0).color("black")))
      if try then report.push(b+((file+": ").color("black")+"success".color("purple")))
    end for

    add_line
    print report.join(c10)
    printb("packages updated: ".color("black")+str(report.len).color("purple"))
    add_line
  end function
  handle["-upg"]=@handle["-upgrade"]

  handle["-update"]=function(cmd);h=head+" -update"
    printb("updating package lists...".color("black"));add_line
    output=aptclient.update
    if tp(output) == "string" and output.len > 0 then ;error_catch.push(parse_error(output, h+": ", 0));return {"status":0, "data":error_catch};end if
    success
  end function
  handle["-upd"]=@handle["-update"]

  handle["-addrepo"]=function(cmd);h=head+" -addrepo"
    if not cmd.hasIndex(2) then ;usage({"usage":[h+" repo_address OPT:port"]});return {"status":0, "data":error_catch};end if
    if not is_valid_ip(cmd[2]) then ;error_catch.push(h+": invalid ip address...");return {"status":0, "data":error_catch};end if
    output=aptclient.add_repo(cmd[2])
    if tp(output) == "string" and output.len > 0 then ;error_catch.push(parse_error(output, h+": ", 0));return {"status":0, "data":error_catch};end if
    aptclient.update
    add_line
  end function
  handle["-ar"]=@handle["-addrepo"]

  handle["-delrepo"]=function(cmd);h=head+" -delrepo"
    if not cmd.hasIndex(2) then ;usage({"usage":[h+" repo_address OPT:port"]});return {"status":0, "data":error_catch};end if
    if not is_valid_ip(cmd[2]) then ;error_catch.push(h+": invalid ip address...");return {"status":0, "data":error_catch};end if
    output=aptclient.del_repo(cmd[2])
    if tp(output) == "string" and output.len > 0 then ;error_catch.push(parse_error(output, h+": ", 0));return {"status":0, "data":error_catch};end if
    aptclient.update
    add_line
  end function
  handle["-dr"]=@handle["-delrepo"]

  handle["-search"]=function(cmd);h=head+" -search"
    if not cmd.hasIndex(2) then ;usage({"usage":[" apt -search program_name"]});return {"status":0, "data":error_catch};end if
    output=aptclient.search(cmd[2])
    if output.lower.search("not found") then ;error_catch.push(parse_error(output, h+": ", 0));return {"status":0, "data":error_catch};end if
    new_out=output.split("<b>|</b>").clean([""])
    for i in new_out
      i=i.replace(c10, "")
      if i.split(" ").len == 1 then ;printb(i.color("purple")+": ".color("black"));continue;end if
      printb(shorten_dialogue(i));add_line
    end for
  end function
  handle["-sc"]=@handle["-search"]

  handle["-show"]=function(cmd);h=head+" -show"
    if not cmd.hasIndex(2) then ;usage({"usage":[" apt -show program_name"]});return {"status":0, "data":error_catch};end if
    output=aptclient.show(cmd[2])
    if output.lower.search("not found") then ;error_catch.push(parse_error(output, h+": ", 0));return {"status":0, "data":error_catch};end if
    new_out=output.split("<b>|</b>").clean([""])
    for i in new_out
      i=i.replace(c10, "")
      while i[0]==" " ;i=i[1:]; end while
      if i.split(" ").len == 1 then ;printb(i.color("purple")+": ".color("black"));continue;end if
      printb(shorten_dialogue(i));add_line
    end for
  end function
  handle["-sh"]=@handle["-show"]

  handle["-install"]=function(cmd);h=head+" -install"
    if not cmd.hasIndex(2) then ;usage({"usage":[h+" program_name"]});return {"status":0, "data":error_catch};end if
    prog_name=cmd[2]
    printb("reading package lists...".color("black"))

    output=aptclient.install(prog_name)
    if tp(output) == "string" then ;error_catch.push(parse_error(output, h+": ", 0));return {"status":0, "data":error_catch};end if

    add_line
    //target_file=objects.nf()
    printb("downloaded: ".color("black")+prog_name.color("purple"))
    add_line
  end function
  handle["-i"]=@handle["-install"]

  proxy=handle[temp.op_type]
  try=proxy(cmd)
  if tp(try) == "map" and not try.status then return try

end function
command.apt=@command["apt-get"]

command.logo=function(cmd)
  cs
  print logo+(b+(a+"v".color("black")+program.version.color("black")+" by ".color("black")+("@"+program.credits.name).color("purple")+program.credits.discord.color("black")))+c0
  add_line
end function

command.ping=function(cmd);head=" "+cmd[0];error_catch=[];temp={"shell":0}
  init=function()
    if cmd.len < 2 then ;usage({"usage":[" ping public_ip"], "note":[" -if blbx is connected to a victim, [ping] will use a shell from their machine."]});return false;end if
    if status.is_active then temp.shell=objects.borrow("shell") else temp.shell=gs
    if not tp(temp.shell) == "shell" then ;error_catch.push(head+": no shells from victim machine stored...");return false;end if
    if not is_valid_ip(cmd[1]) then ;error_catch.push(head+": invalid ip address...");return false;end if
    return true
  end function
  if not init then return {"status":0, "data":error_catch}

  try=temp.shell.ping(cmd[1])
  if tp(try) == "string" then ;error_catch.push(parse_error(try, head+": ", 0));return {"status":0, "data":error_catch};end if

  success
  return {"status":0, "data":cmd[1]}
end function
command["--pi"]=@command.ping

command.json=function(cmd);error_catch=[];head=" "+cmd[0];temp={"file":0}
  init=function()
    //usage: json filePath|fileName|keyword
    if cmd.len < 2 then
      usage({"usage":["json filePath|fileName|keyword"]})
      return false
    end if

    if status.is_active then
      error_catch.push(head+": this command is only for local use...")
      return false
    end if

    temp.file=get_file(cmd[1], hc.File("/"))
    if not temp.file then
      error_catch.push(parse_error(cmd[1], head+": "))
      return false
    end if

    if not temp.file.name.search(".json") then
      error_catch.push(head+": this command is strictly for editing json files...")
      return false
    end if

    return true
  end function
  if not init then return {"status":0, "data":error_catch}


  msg=box("json")+wisp+box("nav")+next+wisp+box("#")+"> ".color("purple")+c("b")+b
  json={}
  json=json.editor_init()
  //exit
  file=temp.file
  json.display=function()
    dl=json.action.get_display;ind=-1
    res_list=[]
    for line in dl
      ind=ind+1
      //line[module.cursor]="<mark=red>"+line[module.cursor]
      halves=line.split(": ")
      if not halves.len-1 then
        bit=reveal(line.color("black"), (json.module.line != ind), line.color("purple"))
      else
        if json.module.line != ind then
          bit=line.color("black")
        else
          bit=reveal(halves[0].color("black")+": ".color("black")+halves[1].color("purple"), (json.module.cursor), halves[0].color("purple")+": ".color("black")+halves[1].color("black"))
        end if
      end if
      text_ind=reveal(" ", (ind < 10), "")+str(ind)
      line=b+(text_ind.color("purple")+"| ".color("black")+bit)

      res_list.push(line)
    end for
    print res_list.join(c10)+c10
  end function

  json.command["DownArrow"]=function();json.action.line_down;end function
  json.command["s"]=@json.command["DownArrow"]

  json.command["UpArrow"]=function();json.action.line_up;end function
  json.command["w"]=@json.command["UpArrow"]

  json.command["LeftArrow"]=function();json.action.cursor_left;end function
  json.command["a"]=@json.command["LeftArrow"]

  json.command["RightArrow"]=function();json.action.cursor_right;end function
  json.command["d"]=@json.command["RightArrow"]

  json.command[""]=function()
    if not json.module.cursor then return
    subject=json.action.get_display[json.module.line].split(": ")[json.module.cursor]
    sub={"process":1, "psuedo_self":json}
    sub_command={}
    sub_command.exit=function();sub.process=0;end function
    sub_command.back=@sub_command.exit;sub_command.done=@sub_command.exit
    sub_command[".."]=function();sub.psuedo_self.action.undo;end function
    sub_command["."]=function();sub.psuedo_self.action.redo;end function

    while sub.process; cs
      json.display()
      msg=box("json")+wisp+box("edit")+next+wisp+box("#")+"> ".color("purple")+c("b")+b
      new_subject=ui(msg)
      if new_subject.len > 0 and new_subject[0] == "\" then
        new_subject=new_subject[1:]
      else
        if sub_command.hasIndex(new_subject) then
          proxy=sub_command[new_subject]
          proxy()
          continue
        end if
      end if
      if tp(new_subject.to_int) == "number" then new_subject=new_subject.to_int else new_subject=new_subject.quote

      get_indent=function()
        count=0
        while subject[0]==" " ;count=count+1;subject=subject[1:];end while
        return count
      end function

      new_subject=(" "*get_indent)+new_subject
      if json.module.cursor then
        inverse_cursor=0
        new_version=json.action.get_display.deep_copy
        new_version[json.module.line]=new_version[json.module.line].split(": ")[inverse_cursor][0:-1]+""""+": "+new_subject+reveal(",", (json.module.line!=json.module.line_limit-1), "")
        json.action.add_display(new_version)
      else
        inverse_cursor=1
        new_version=json.action.get_display.deep_copy
        new_version[json.module.line]=new_subject+": "+new_version[json.module.line].split(": ")[inverse_cursor][0:-1]
        json.action.add_display(new_version)
      end if

    end while
  end function

  json.command["E"]=function();json.module.process=0;end function
  json.command["X"]=@json.command["E"]

  result=json.editor(c0, @cnf, @json.display, ("{}[]'wasdEX"+"""").values+["", "LeftArrow", "RightArrow", "DownArrow", "UpArrow"], file.get_content.dec.split(c10))

  if result != file.get_content.dec.split(c10) then
    try=temp.file.set_content(result.join(c10).enc)
    if tp(try) == "string" then ;error_catch.push(parse_error(try, head+": ", 0));return {"status":0, "data":error_catch};end if
    notify("changes to "+("'"+temp.file.name+"'").color("black black white")+" saved", "json")
    return {"status":1, "data":result.join(c10)}
  end if

end function

command.syntax=function(cmd);error_catch=[];head=" "+cmd[0]
  init=function()
    if cmd.join(" ").search("-h") then
      usage({"desc":["this command prints text demonstrating the proper way to use the blbx {pipe} system."]})
      return false
    end if
    usage({"desc":["the {pipe} system is composed of syntax, and command pockets that hold data. every command has a pocket that holds one data entry at a time. these data entries can be a list of strings, or singular strings. the syntax to use the piping system is as follows...", ""], "syntax":["-use colons surrounded by white-space (' : ') to separate commands or operations and run them in succession. the commands and operations separated by these colons are called links, and multiple links are called chains.", "  'cd /home/guest : ls'", "  'find .json ^ : find >+ cat : cat > json'", c10, "-an operation is denoted by the following symbols:", "  '^', '>', '>+'", c10, "-'^' tells blbx to store the result of the command before it in the command's pocket. any text found after the symbol will be ignored until the next link starts. ", c10, "-'>' this operator requires two commands to be used. it takes the pocket of the first command and passes it to the second command to be used. the second command is able to take flags as additional input.", "  '... : find > cat'", c10, "-'>+' works similarly to the '>' operation, but adds the results of the whole operation to the second command's pocket to be used later. ", "  '... : find >+ cat : cat > --d'"]})
    return true
  end function
  if not init then return {"status":0, "data":error_catch}
end function
command.pipe=@command.syntax

command.purge=function(cmd);error_catch=[];head=" "+cmd[0];temp={"file":0}
  init=function()
    if not status.is_active then
      error_catch.push(head+": must [connect] to a target to use this command...")
      return false
    end if
    temp.file=device.current.mainf
    return true
  end function
  if not init then return {"status":0, "data":error_catch}
  try=action.purge(temp.file)
  if not try then
    error_catch.push(head+": failed to start purge operation...")
    return {"status":0, "data":error_catch}
  end if

end function
command["--pu"]=@command.purge

command.ssh=function(cmd);error_catch=[];head=" "+cmd[0];temp={"user":"", "passwd":"", "pub":0, "port":22}
  init=function()
    //usage: ssh public_ip user password OPT: port
    if cmd.len < 4 then
      usage({"usage":["ssh public_ip user passwd OPT: port"]})
      return false
    end if

    if is_valid_ip(nslookup(cmd[1])) then cmd[1]=nslookup(cmd[1])
    if not is_valid_ip(cmd[1]) then ;error_catch.push(head+": invalid public ip address...");return false; end if
    if cmd.hasIndex(4) and tp(cmd[4].to_int) != "number" then ;error_catch.push(head+": invalid port...");return false; end if
    temp.pub=cmd[1];temp.user=cmd[2];temp.passwd=cmd[3];if cmd.hasIndex(4) then temp.port=cmd[4].to_int

    return true
  end function
  if not init then return {"status":0, "data":error_catch}

  temp_shell=gs.connect_service(temp.pub, temp.port, temp.user, temp.passwd)
  if not tp(temp_shell) == "shell" then
    error_catch.push(head+": could not establish ssh connection...")
    return {"status":0, "data":error_catch}
  end if

  objects.add(temp_shell, temp_shell.host_computer.local_ip)
  collect

  success

end function

command.secure=function(cmd);error_catch=[];head=" "+cmd[0];temp={"file":0}
  init=function()
    if status.is_active then temp.file=objects.borrow("file") else temp.file=gs.host_computer.File("/")
    return true
  end function
  if not init then return {"status":0, "data":error_catch}

  action.secure(temp.file)

end function
command["--s"]=@command.secure

command.weaken=function(cmd);error_catch=[];head=" "+cmd[0];temp={"file":0}
  init=function()
    if status.is_active then temp.file=objects.borrow("file") else temp.file=gs.host_computer.File("/")
    return true
  end function
  if not init then return {"status":0, "data":error_catch}

  action.secure(temp.file, 1)

end function
command["--w"]=@command.weaken

command.stored=function(cmd)
  printb("exploits stored: ".color("black")+str(aux.exploits.mem_list.len).color("purple"))
  printb("passwords stored: ".color("black")+str(poly.get.dict.len).color("purple"))
  printb("bank acc's stored: ".color("black")+str(poly.get.bank.len).color("purple"))
  add_line
end function
command["--st"]=@command.stored

command.test=function(cmd)
  if not cmd.hasIndex(1) then cmd.push("Hello World")
  print cmd[1].enc
end function

command.test1=function(cmd)
  print "hello world".dec
end function

command.mod=function(cmd)
  num1=cmd[1].to_int;num2=cmd[2].to_int
  printb(str(num1%num2).color("purple"))
  add_line
end function

//customcmds.so