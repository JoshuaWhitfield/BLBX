nav={"localDir":"/", "remoteDir":"/"}
nav.get=function();if status.is_active then return nav.remoteDir;return nav.localDir;end function
nav.set=function(str);if status.is_active then nav.remoteDir=str else nav.localDir=str;return true;end function
monitor={}
monitor.touch_entries_input=[]
monitor.touch_entries_inverse=[]

trojan={}
trojan.bounce="c0=char(0);c10=char(10);c33=char(33);tp=@typeof;cs=@clear_screen;ui=@user_input;gs=get_shell;hc=gs.host_computer"+";b="+"<b>".quote+";u="+"<u>".quote+";b2="+"</b>".quote+";u2="+"</u>".quote+""+";color={"+"map".quote+":{"+"b".quote+":"+"#707070".quote+", "+"p".quote+":"+"#7A53F6".quote+", "+"w".quote+":"+"#BEB9E7FF".quote+", "+"r".quote+":"+"red".quote+"}}"+";obj=get_custom_object"+";toolbox=obj.data"+";add_line=function();print+c0;end function"+";c=function(str)"+";  if tp(color.map.indexes.indexOf(str)) == "+"number".quote+" then return "+"<color=".quote+"+color.map[str]+"+">".quote+""+";  if tp(str.indexOf("+"<color=".quote+")) == "+"number".quote+" then return str"+";  return "+"<color=".quote+"+str+"+">".quote+""+";end function"+";string.color=function(string_split_by_space="+"black black black".quote+");list=string_split_by_space.split("+" ".quote+")"+";  if not string_split_by_space.len then string_split_by_space="+"black black black".quote+""+";  colorm={"+"black".quote+":"+"<#707070>".quote+", "+"white".quote+":"+"<#BEB9E7FF>".quote+", "+"purple".quote+":"+"<#7A53F6>".quote+", "+"pink".quote+":"+"<#ED2EEA>".quote+", "+"red".quote+":"+"<color=red>".quote+", "+"dark_red".quote+":"+"<#731313>".quote+", "+"blue".quote+":"+"<color=blue>".quote+", "+"green".quote+":"+"<#2BB930>".quote+", "+"dark_green".quote+":"+"<#2C6407>".quote+", "+"cyan".quote+":"+"<#32E3EF>".quote+", "+"yellow".quote+":"+"<#D2DE0F>".quote+", "+"brown".quote+":"+"<#674D06>".quote+", "+"orange".quote+":"+"<#EA9512>".quote+"}"+";  alpha="+"qwertyuiopasdfghjklzxcvbnm".quote+";number="+"1234567890".quote+";symbol="+"!@#$%^&*()_+-={}|[]\:;'<>?,./".quote+"+"+"".quote+""+"".quote+""+";  check_all=function();res=1;for i in list;if not colorm.hasIndex(i) then ;res=0;break;end if;end for;return res;end function"+";  if not check_all() then return false"+";  while list.len < 3;list.push(list[-1]);end while"+";  coa=colorm[list[0]];con=colorm[list[1]];cos=colorm[list[2]];curr_color=coa;curr_type="+"alpha".quote+";newl=[];fp=1"+";  for char in self.values"+";    is_a=(tp(alpha.indexOf(char.lower)) == "+"number".quote+");is_n=(tp(number.indexOf(char)) == "+"number".quote+");is_s=(tp(symbol.indexOf(char)) == "+"number".quote+")"+";    if char==c10 then ;newl.push(char+curr_color);continue;end if"+";    if is_a then curr_type="+"alpha".quote+";if is_n then curr_type="+"number".quote+";if is_s then curr_type="+"symbol".quote+""+";    if curr_type=="+"alpha".quote+" then"+";      if curr_color!=coa or (curr_color==coa and fp) then curr_color=coa else curr_color="+"".quote+";fp=0"+";      newl.push(curr_color+char);curr_color=coa;continue"+";    end if"+";    if curr_type=="+"number".quote+" then"+";      if curr_color!=con or (curr_color==con and fp) then curr_color=con else curr_color="+"".quote+";fp=0"+";      newl.push(curr_color+char);curr_color=con;continue"+";    end if"+";    if curr_type=="+"symbol".quote+" then"+";      if curr_color!=cos or (curr_color==cos and fp) then curr_color=cos else curr_color="+"".quote+";fp=0"+";      newl.push(curr_color+char);curr_color=cos;continue"+";    end if"+";    newl.push(char)"+";  end for"+";  self=newl.join("+"".quote+");ctr=0"+";  for i in self"+";    if i == "+"<".quote+" then ctr=ctr+1"+";  end for"+";  for i in range(1,ctr)"+";    self=self+"+"</color>".quote+""+";  end for"+";  return self"+";end function"+";"+";reveal=function(str, onCondition=0, elseShow="+"".quote+");if onCondition then return str;return elseShow;end function"+";st="+"<s>".quote+";est="+"</s>".quote+""+";wisp=c("+"p".quote+")+"+"•".quote+"+c("+"w".quote+")+st+"+" ".quote+"+est+c("+"p".quote+")+"+"•".quote+""+";box=function(str, opt=0, opt2=0);return c("+"b".quote+")+b+"+"[".quote+"+reveal(u, (not opt), "+" ".quote+")+c("+"p".quote+")+str+c("+"b".quote+")+reveal(u2, (not opt), "+" ".quote+")+"+"]".quote+";end function"+";notify=function(str, type="+"!".quote+");return c10+box(type.color("+"white".quote+"),1)+wisp+box(str,1);end function"+";search=function(originalStr, string);if typeof(originalStr.indexOf(string)) != "+"number".quote+" then return false;return true;end function"+";"+";objects={"+"shell".quote+":{"+"list".quote+":[]}, "+"computer".quote+":{"+"list".quote+":[]}, "+"file".quote+":{"+"list".quote+":[]}, "+"null".quote+":{"+"list".quote+":[]}, "+"number".quote+":{"+"list".quote+":[]}, "+"rshell".quote+":{"+"list".quote+":[]}, "+"nfl".quote+":[]};osl=objects.shell.list;ocl=objects.computer.list;ofl=objects.file.list;orshl=objects.rshell.list"+";objects.parse=function(list, lan=0, loginAsUser=0, all=0)"+";	if list==[] then return false"+";	l=[]"+";	userl={"+"root".quote+":[], "+"guest".quote+":[], "+"unknown".quote+":[], "+"usr".quote+":[]}"+";  for i in list"+";    obj=i[0];username=i[1];lanip=i[2]"+";"+";"+";    if loginAsUser!=0 then"+";      if lan != 0 then"+";        if lan==lanip and search(username.lower, loginAsUser.lower) then userl["+"usr".quote+"].push(obj)"+";        continue"+";      end if"+";      if search(username.lower, loginAsUser.lower) then userl["+"usr".quote+"].push(obj)"+";      continue"+";    end if"+";    if lan != 0 then"+";      if username=="+"root".quote+" and lan==lanip then userl["+"root".quote+"].push(obj)"+";      if username=="+"unknown".quote+" and lan==lanip then userl["+"unknown".quote+"].push(obj)"+";      if username=="+"guest".quote+" and lan==lanip then userl["+"guest".quote+"].push(obj)"+";      if not userl.hasIndex(username) and lan==lanip then userl["+"usr".quote+"].push(obj)"+";      continue"+";    end if"+";    if username=="+"root".quote+" then userl["+"root".quote+"].push(obj)"+";    if username=="+"unknown".quote+" then userl["+"unknown".quote+"].push(obj)"+";    if username=="+"guest".quote+" then userl["+"guest".quote+"].push(obj)"+";    if not userl.hasIndex(username) then userl["+"usr".quote+"].push(obj)"+";  end for"+";"+";  if not loginAsUser and lan!=0 and all then return userl.root+userl.guest+userl.unknown+userl.usr"+";  if userl.root.len > 0 then return userl.root[0]"+";  if userl.usr.len > 0 then return userl.usr[0]"+";  if userl.unknown.len > 0 then;if all then return userl.unknown;return userl.unknown[0];end if"+";  if userl.guest.len > 0 then return userl.guest[0]"+";"+";  return false"+";end function"+";objects.navfile=function(obj, path=0, name=0, all=0, firstpass=1)"+";  if firstpass!=0 then ;while obj.path != "+"/".quote+";obj=obj.parent;end while;objects.nfl=[];firstpass=0;end if"+";  if tp(path) == "+"string".quote+" and path == "+"/".quote+" then return obj;result=false"+";  if tp(path) == "+"string".quote+" and path[0] != "+"/".quote+" then path="+"/".quote+"+path"+";  if tp(path) == "+"string".quote+" and path[-1] == "+"/".quote+" then path=path[:-1]"+";  if tp(name) == "+"string".quote+" then name=name.lower"+";  if tp(path) == "+"string".quote+" then path=path.lower"+";  for i in obj.get_folders+obj.get_files"+";    if not all and tp(result) == "+"file".quote+" then ;objects.nfl=[];return result;end if"+";    if all and [path,name] == [0,0] then objects.nfl.push([i, i.path, i.get_content, [i.is_folder,i.is_binary], i.name, i.size, i.permissions, i.owner, i.group])"+";    if (all and tp(name) == "+"string".quote+") and search(i.name.lower, name) then objects.nfl.push([i, i.path, i.get_content, [i.is_folder,i.is_binary], i.name, i.size, i.permissions, i.owner, i.group])"+";    if (tp(path)=="+"string".quote+" and [name,all]==[0,0]) and i.path.lower==path then ;result=i;objects.nfl=[];return result;end if"+";    if (tp(name)=="+"string".quote+" and [path,all]==[0,0]) and search(i.name.lower, name) then ;result=i;objects.nfl=[];return result;end if"+";    if ([path,name,all]==[0,0,0]) then obj.nfl.push([i, i.path, i.get_content, [i.is_folder,i.is_binary], i.name, i.size, i.permissions, i.owner, i.group])"+";    if i.is_folder then result=self.navfile(i, path, name, all, firstpass)"+";  end for"+";"+";  if ([path,name,all]==[0,0,0]) or all then return objects.nfl"+";  objects.nfl=[];return result"+";end function;objects.nf=@objects.navfile"+";objects.getUser=function(obj);result=false"+";  if tp(obj) == "+"shell".quote+" then obj=obj.host_computer"+";  if tp(obj) == "+"computer".quote+" then obj=obj.File("+"/".quote+")"+";"+";  if not tp(objects.nf(obj, "+"/root".quote+")) then file=[objects.nf(obj, "+"/boot/System.map".quote+"), objects.nf(obj, "+"/home".quote+")] else file=[objects.nf(obj, "+"/root".quote+"), objects.nf(obj, "+"/home".quote+")]"+";  if tp(file[0]) == "+"file".quote+" and file[0].has_permission("+"w".quote+") then return "+"root".quote+""+";  if tp(file[1]) == "+"file".quote+" then list=file[1].get_folders"+";  users=[];file_list=[];result=[]"+";  for f in list;if f.has_permission("+"w".quote+") then users.push(f.name);end for"+";"+";  if users.hasIndex(1) then return users[0]"+";  if tp(users.indexOf("+"guest".quote+")) == "+"number".quote+" then return "+"guest".quote+""+";  return "+"unknown".quote+""+";end function"+";objects.allocate=function(obj, lanip)"+";  if tp(["+"shell".quote+", "+"computer".quote+", "+"file".quote+"].indexOf(tp(obj))) == "+"number".quote+" then print b+(tp(obj).color("+"purple".quote+"))+c0"+";  if tp(obj) == "+"number".quote+" then ;if obj then ;objects.number.list.push([obj]);end if"+";  if tp(obj) == "+"shell".quote+" then ;objects.add(obj, lanip);objects.add(obj.host_computer, lanip);objects.add(obj.host_computer.File("+"/".quote+"), lanip);end if"+";  if tp(obj) == "+"computer".quote+" then ;objects.add(obj, lanip);objects.add(obj.File("+"/".quote+"), lanip);end if"+";  if tp(obj) == "+"file".quote+" then ;while obj.path!="+"/".quote+";obj=obj.parent;end while;objects.add(obj, lanip);end if"+";end function"+";objects.add=function(obj, lanip);objects[tp(obj)].list.push([obj, objects.getUser(obj), lanip, tp(obj)]);end function"+";objects.wipe=function();for i in objects.indexes;if tp(objects[i])!="+"map".quote+" then continue;objects[i].list=[];end for;end function"+";objects.has=function(list);if not list.len then return false;return true;end function"+";"+";get_mx=objects.nf(hc.File("+"/".quote+"), 0, "+"metaxploit.so".quote+")"+";mx=include_lib(get_mx.path)"+";"+";get_library=function(name)"+";  try=objects.nf(hc.File("+"/".quote+"), 0, name, 1)"+";  if not try.len then return false;result=false"+";  for i in try"+";    if i[0].name == name then"+";      get_obj=mx.load(i[0].path)"+";			"+";			if search(tp(get_obj), "+"Lib".quote+") then"+";				result=get_obj"+";				break"+";			end if"+";    end if"+";  end for"+";  return result"+";end function"+";"+";"+";temp=get_library(toolbox.lib)"+";if not temp or tp(temp) == "+"null".quote+" then return {"+"data".quote+":0,"+"callback".quote+":0, "+"msg".quote+":"+" trojan -b: library '".quote+"+toolbox.lib+"+"' not found...".quote+"}"+";toolbox.lib=temp"+";"+";get_payloads=function(lib, check=0, mem=0)"+";  db_map=toolbox.db"+";	ver=lib.version;name=lib.lib_name"+";	if not db_map.len then return false"+";  if (not db_map.hasIndex(name)) or (db_map.hasIndex(name) and not db_map[name].hasIndex(ver)) then return false"+";  if check then return true"+";  meml_owned=db_map[name][ver].indexes;payl=[]"+";  for memo in meml_owned;if not mem then ;payl=payl+db_map[name][ver][memo]; else ;if memo==mem then ;payl=db_map[name][ver][memo];break;end if;end if;end for"+";  return payl"+";end function"+";"+";"+";platter={"+"exploit".quote+":{}, "+"objects".quote+":0}"+";"+";execute=function(lib, lanip)"+";"+";	if get_payloads(lib, 1) and not toolbox.scan then"+";		print b+("+" found ".quote+"+lib.lib_name+"+" ".quote+"+lib.version).color("+"black purple purple".quote+")+c0"+";		memories=toolbox.db[lib.lib_name][lib.version].indexes"+";		print b+("+" stored addresses: ".quote+".color("+"black".quote+")+str(memories.len).color("+"purple".quote+"))+c10+c0"+";		for m in memories"+";			unsafe_vals=get_payloads(lib, 0, m)"+";			for p in unsafe_vals"+";				res=lib.overflow(m, p, lanip)"+";				if tp(res) == "+"null".quote+" then objects["+"null".quote+"].list.push([res, tp(res), m, p, lanip])"+";	      objects.allocate(res, lanip)"+";			end for"+";		end for"+";		return true"+";	end if"+";"+";	print b+("+"scanning: ".quote+".color("+"black".quote+"))+(lib.lib_name+"+" ".quote+"+lib.version+"+" ".quote+"+lanip).color("+"black purple purple".quote+")+c0"+";  memories=mx.scan(lib)"+";  for m in memories;unsafe_vals=[];output=mx.scan_address(lib, m);for line in output.split(c10);if tp(line.indexOf("+"</b>.".quote+")) == "+"number".quote+" then;unsafe_vals.push(slice(line, line.indexOf("+"<b>".quote+"), line.indexOf("+"</b>".quote+"))[3:]);end if;end for;"+";    platter.exploit[m]=unsafe_vals"+";    for p in unsafe_vals"+";      res=lib.overflow(m, p, lanip)"+";      if tp(res) == "+"null".quote+" then objects["+"null".quote+"].list.push([res, tp(res), m, p, lanip])"+";      objects.allocate(res, lanip)"+";    end for"+";  end for"+";"+";	return true"+";end function"+";execute(toolbox.lib, toolbox.lan)"+";"+";platter.objects=objects"+";obj.callback={"+"platter".quote+":platter}"+";return obj"+";"
trojan.dict="obj=get_custom_object()"+";if params.hasIndex(1) then"+";  shell=get_shell(params[0], params[1])"+";  if typeof(shell) == "+"shell".quote+" then obj.callback=params[1]"+";else"+";  pl=obj.dict"+";  user=params[0]"+";  for i in pl"+";    shell=get_shell(user, i)"+";    if typeof(shell) == "+"shell".quote+" then ;obj.callback=i;break; end if"+";  end for"+";end if"+";return obj"+";"
trojan.escalate="obj=get_custom_object()"+";if params.hasIndex(1) then"+";  shell=get_shell(params[0], params[1])"+";  if typeof(shell) == "+"shell".quote+" then obj.callback=shell"+";else"+";  pl=obj.dict"+";  user=params[0]"+";  for i in pl"+";    shell=get_shell(user, i)"+";    if typeof(shell) == "+"shell".quote+" then ;obj.callback=shell;break; end if"+";  end for"+";end if"+";return obj"+";"

ip={"pub":"", "lan":"127.0.0.1", "lanList":[]}
ip.rnd=function()
  //rif = random_integer_from...
  rif0=function();return floor((rnd * 255) + 0);end function
  rif1=function();return floor((rnd * 255) + 1);end function
  return rif1+"."+rif0+"."+rif0+"."+rif0
end function

misc={"CPT":"1234", "dict_hash_map":{}, "macro_db_map":{}}
PasswordGenerator.init(PasswordGenerator.PASSWORDS)

poly={}
poly.get=get_custom_object()
if not poly.get.hasIndex("dict") then poly.get.dict=0
if not poly.get.hasIndex("bank") then poly.get.bank=0
if not poly.get.hasIndex("mail") then poly.get.mail=0

poly.get.data=0;poly.get.callback=0;poly.get.migration={"status":0}
poly.set=function(val=0)
  poly.get["data"]=val
  return true
end function

inputClean=function(input_list, avoidStr="");newl=[];if tp(input_list) == "string" then input_list=input_list.values;for i in input_list;if i == avoidStr then continue;newl.push(i);end for;return newl;end function

permissions=function(obj, usr="r")
  perms=obj.permissions[1:];r=perms[:3];u=perms[3:6];g=perms[6:9]
  map={"r":r, "u":u, "g":g}
  while tp(map[usr].indexOf("-")) == "number";map[usr]=map[usr].remove(map[usr].indexOf("-"));end while
  if map[usr] == "" then return false
  return map[usr]
end function

objects={"shell":{"list":[]}, "computer":{"list":[]}, "file":{"list":[]}, "null":{"list":[]}, "number":{"list":[]}, "rshell":{"list":[]}, "nfl":[]};osl=objects.shell.list;ocl=objects.computer.list;ofl=objects.file.list;orshl=objects.rshell.list

objects.parse=function(list, lan=0, loginAsUser=0, all=0)//(objects.file.list, lan, 0, 1)
	if not list.len then return false
	user_dict={"root":[], "guest":[], "unknown":[], "usr":[]}
  
  for object_arr in list
    object = object_arr[0]
    username = object_arr[1]
    lanip = object_arr[2]

    if loginAsUser then
      if lan then
        if lan == lanip and search(username.lower, loginAsUser.lower) then user_dict["usr"].push(object)
        continue
      end if
      if search(username.lower, loginAsUser.lower) then user_dict["usr"].push(object)
      continue
    end if

    if lan and lan == lanip then
      if username == "root" then user_dict["root"].push(object)
      if username == "guest" then user_dict["guest"].push(object)
      if username == "unknown" then user_dict["unknown"].push(object)
      if not user_dict.hasIndex(username) then user_dict["usr"].push(object)
      continue
    end if

    if username == "root" then user_dict["root"].push(object)
    if username == "guest" then user_dict["guest"].push(object)
    if username == "unknown" then user_dict["unknown"].push(object)
    if not user_dict.hasIndex(username) then user_dict["usr"].push(object)
  end for

  if not loginAsUser and lan and all then return user_dict.root + user_dict.guest + user_dict.unknown + user_dict.usr
  if user_dict.root.len > 0 then return user_dict.root[0]
  if user_dict.usr.len > 0 then return user_dict.usr[0]
  if user_dict.unknown.len > 0 then return user_dict.unknown[0]
  if user_dict.guest.len > 0 then return user_dict.guest[0]

  return false
end function
objects.navfile=function(obj, path=0, name=0, all=0, firstpass=1)//nfl --> navFileList --> []
  if firstpass then ;while obj.path != "/";obj=obj.parent;end while;objects.nfl=[];firstpass=0;end if
  if tp(path) == "string" and path == "/" then return obj;result=false
  if tp(path) == "string" and path[0] != "/" then path="/"+path
  if tp(path) == "string" and path[-1] == "/" then path=path[:-1]
  if tp(name) == "string" then name=name.lower
  if tp(path) == "string" then path=path.lower
  for i in obj.get_folders+obj.get_files
    if not all and tp(result) == "file" then ;objects.nfl=[];return result;end if
    if all and [path,name] == [0,0] then objects.nfl.push([i, i.path, i.get_content, [i.is_folder,i.is_binary], i.name, i.size, i.permissions, i.owner, i.group])
    if (all and tp(name) == "string") and search(i.name.lower, name) then objects.nfl.push([i, i.path, i.get_content, [i.is_folder,i.is_binary], i.name, i.size, i.permissions, i.owner, i.group])
    if (tp(path)=="string" and [name,all]==[0,0]) and i.path.lower==path then ;result=i;objects.nfl=[];return result;end if
    if (tp(name)=="string" and [path,all]==[0,0]) and search(i.name.lower, name) then ;result=i;objects.nfl=[];return result;end if
    if ([path,name,all]==[0,0,0]) then obj.nfl.push([i, i.path, i.get_content, [i.is_folder,i.is_binary], i.name, i.size, i.permissions, i.owner, i.group])
    if i.is_folder then result=self.navfile(i, path, name, all, firstpass)
  end for

  if ([path,name,all]==[0,0,0]) or all then return objects.nfl
  objects.nfl=[];return result
end function;objects.nf=@objects.navfile
objects.get_user=function(obj);result=false
  if tp(obj) == "shell" then obj=obj.host_computer
  if tp(obj) == "computer" then obj=obj.File("/")

  if not tp(objects.nf(obj, "/root")) then file=[objects.nf(obj, "/boot/System.map"), objects.nf(obj, "/home")] else file=[objects.nf(obj, "/root"), objects.nf(obj, "/home")]
  if tp(file[0]) == "file" and file[0].has_permission("w") then return "root"
  if tp(file[1]) == "file" then list=file[1].get_folders
  users=[];file_list=[];result=[]
  for f in list;if f.has_permission("w") then users.push(f.name);end for

  if users.hasIndex(1) then return users[0]
  if tp(users.indexOf("guest")) == "number" then return "guest"
  return "unknown"
end function
objects.allocate=function(obj, lanip)
  if tp(["shell", "computer", "file"].indexOf(tp(obj))) == "number" then print b+(tp(obj).color("purple"))
  if tp(obj) == "number" then ;if obj then print b+("password: ".color("black")+misc.CPT.color("purple"));self.number.list.push([obj]);end if
  if tp(obj) == "shell" then ;self.add(obj, lanip);self.add(obj.host_computer, lanip);self.add(obj.host_computer.File("/"), lanip);end if
  if tp(obj) == "computer" then ;self.add(obj, lanip);self.add(obj.File("/"), lanip);end if
  if tp(obj) == "file" then ;while obj.path!="/";obj=obj.parent;end while;self.add(obj, lanip);end if
end function
objects.add=function(obj, lanip)
  self[tp(obj)].list.push([obj, self.get_user(obj), lanip, tp(obj)])
  if tp(obj) == "shell" then return self.add(obj.host_computer, lanip)
  if tp(obj) == "computer" then return self.add(obj.File("/"), lanip)
end function
objects.wipe=function()
  self.shell={"list":[]}
  self.computer={"list":[]}
  self.file={"list":[]}
  self["null"]={"list":[]}
  self.number={"list":[]}
  self.rshell={"list":[]}
  self.nfl=[]
  osl=self.shell.list;ocl=self.computer.list;ofl=self.file.list;orshl=self.rshell.list
end function
objects.has=function(list);if not list.len then return false;return true;end function
objects.is_empty=function(obj_name)
  if not objects[obj_name].list.len then return true
  return false
end function
objects.borrow=function(obj_name, as_user = 0)
  if not objects.is_empty(obj_name) then
    object=objects.parse(objects[obj_name].list, ip.lan, as_user)
    if not object then return false
    return object
  end if
  return false
end function

get_library=function(name)
  try=objects.nf(hc.File("/"), 0, name, 1)
  if not try.len then return null;result=false
  for i in try
    if i[0].name == name then
      obj=include_lib(i[0].path)
      if ["number", "null"].has(tp(obj)) then continue
      result=obj;break
    end if
  end for
  return result
end function

secure={}
secure.file=function(file, set_owner=0, set_group=0, is_recursive=0)
  crit="ugo";perm="-rwx"
  if not file.has_permission("w") then return false
  for i in crit;if set_group!=0 then file.set_group(set_group, is_recursive);if set_owner!=0 then file.set_owner(set_owner, is_recursive);file.chmod(i+perm, is_recursive);end for
end function

secure.machine=function(shell)
  if tp(shell) != "shell" or (tp(shell) == "shell" and objects.get_user(shell) != "root") then return false
  rhc=shell.host_computer;rfmain=hc.File("/")
  sys=objects.nf(file, 0, 0, 1)
  for i in sys;if i.is_folder then secure.file(i, 1) else secure.file(i);end for
end function

device={"tree":{}, "current":{}, "user_list":{}, "display_tree":""}
device.add=function(lanIP)
  map={};map.lan=lanIP
  f=objects.parse(objects.file.list, map.lan)
  map.shell_list=objects.parse(objects.shell.list, map.lan, 0, 1)
  map.comp_list=objects.parse(objects.computer.list, map.lan, 0, 1)
  map.file_list=objects.parse(objects.file.list, map.lan, 0, 1)
  if tp(f) == "file" then
    map.mainf=objects.nf(f, "/");map.homef=objects.nf(f, "/home");map.varf=objects.nf(f, "/var");map.etcf=objects.nf(f, "/etc")
    map.libf=objects.nf(f, "/lib");map.sysf=objects.nf(f, "/sys");map.bootf=objects.nf(f, "/boot");map.vitals=[map.sysf, map.bootf, map.libf]
    map.rootf=objects.nf(f, 0, "root", 1);map.passf=objects.nf(f, 0, "passwd", 1);map.logf=objects.nf(f, 0, "system.log", 1);map.configf=objects.nf(f, 0, "Config", 1)[:-1];map.trashf=objects.nf(f, 0, ".Trash", 1);map.sourcesf=objects.nf(f, 0, "sources.txt", 1)
    map.all=[map.mainf, map.homef, map.varf,  map.etcf, map.vitals, map.rootf, map.passf, map.logf, map.configf, map.trashf]

  end if
  if map.len == 1 then ;for i in ["mainf", "homef", "varf", "etcf", "vitals", "rootf", "passf", "logf", "configf", "trashf"];if tp(i.indexOf("f")) == "number" then;map[i]=0;continue;end if;map[i]=[0,0,0];end for;end if
  map.profile=function()
    res=(a+" victim profile:")+c10+(a+bar(25))+c10
    todos=[map.shell_list, map.comp_list, map.file_list]
  end function
  device.tree[lanIP]=map
  return map
end function
device.get=function(lanIP);if device.tree.hasIndex(lanIP) then return device.tree[lanIP];return false;end function
device.prep_file_obj=function(file);return [file, file.get_content, file.permissions, file.size];end function

device.get_vuln_dir = function(inputFile = 0)
  if not inputFile then inputFile = objects.borrow("file", user.current.name)
 
  for file in inputFile.get_folders

    if file.has_permission("w") and file.has_permission("x") then return file
     
    result = device.get_vuln_dir(file)
    if not result then continue
    return result
  end for

  return false
end function

device.get_user=function(input, lanip);res=0
  for i in device.user_list[lanip]
    if i.lower.search(input.lower) then ;res=i;break; end if
  end for
  return res
end function
device.wipe=function();self.tree={};self.current={};self.user_list={};self.display_tree="";end function

user={"tree":{}, "current":{"name":""}}
user.wipe=function();self.tree={};self.current={"name":""};end function
user.add=function(lanIP, name)
  map={};map.name=name;map.lan=lanIP;map.pub=ip.pub
  map.f=objects.parse(objects.file.list, lanIP, name)
  map.s=objects.parse(objects.shell.list, lanIP, name)
  map.c=objects.parse(objects.computer.list, lanIP, name)

  if tp(map.f) != "file" then;map.config=0;else;if name=="root" then path="/root/Config" else path="/home/"+name+"/Config";try=objects.nf(map.f, 0, "config", 1);map.config=0;for i in try;if search(i[0].path, name) then ;map.config=i;break;end if;end for
    map.bank=objects.nf(map.f, path+"/Bank.txt")
    map.mail=objects.nf(map.f, path+"/Mail.txt")
    map.browser=objects.nf(map.f, path+"/Browser.txt")
  ;end if
  if not user.tree.hasIndex(lanIP) then user.tree[lanIP]={}
  user.tree[lanIP][name]=map

  return true
end function

user.get=function(name, lanip)
  res=0
  for i in user.tree[lanip].indexes
    if i.lower.search(name.lower) then res=i
  end for
  return res
end function

user.add_obj=function(name, lanip, obj)
  usr=user.get(name, lanip)
  if not usr then return false
  usr=user.tree[lanip][name]
  if tp(obj) == "shell" then
    usr.s=obj
    return user.add_obj(name, lanip, obj.host_computer)
  end if
  if tp(obj) == "computer" then
    usr.c=obj
    return user.add_obj(name, lanip, obj.File("/"))
  end if

  usr.f=obj
  return true
end function
user.wipe=function();user={"tree":{}, "current":{"name":""}};end function

device.display_tree=function(show=0, add=0)
  get_objects=function(input_list)//[shell=0?, file=0?, comp=0?]
    res="   ".color("black")
    for i in input_list
      if not i then continue
      clip=tp(i);if clip == "computer" then clip="comp"
      clip=b+(clip.color("black"))
      res=res+clip+" "
    end for
    return res+c10
  end function
  res="";head=b+((" "*7)+"user tree:").color("purple")+c10
  for i in user.tree
    if not i.value.len then continue
    res=res+c10+b+(" "+i.key+": ").color("black")+c10
    for name in i.value.indexes.reverse;s=user.tree[i.key][name].s;c=user.tree[i.key][name].c;f=user.tree[i.key][name].f;res=res+b+("  -"+name.lower).color("purple purple black")+c10+get_objects([s,c,f]);end for
  end for
  if res=="" then res=reveal(c10, (add))+head+bar(25)+c10+b+("          none".color("black"))+c10+bar(25) else res=reveal(c10, (add))+head+bar(25)+res+bar(25)
  if show then print res+c0+c10
  return res+c0
end function

dia={}
//dia.dialogue={"mad":["you know, machines have feelings too :("], "happy":[], "nuetral":["umm, you've got sumn on ur..."], "extra":["boo!"], "questions":[], "say_pls":[["magic word?", "okay, sure!"], ["ask nicely...", "okay fine."], ["can't you ask nicely?", "sheesh, i'm gonna start charging u."]]}
dia.action={}
dia.registry={}
dia.action.refresh=function()
end function
dia.action.listen=function()
end function
dia.action.own=function()
end function

debug={}
debug.post=function(header, printThis);print(reveal(header+": "+printThis, (status.debugMode), ""));end function;debug.p=@debug.post
debug.toggle=function();if not status.debugMode then status.debugMode=1 else status.debugMode=0;end function;debug.t=@debug.toggle
max=function(val=false);opt=false;for i in val;if typeof(i) == "list" then i=i.len else i=str(i).len;if i > opt then opt=i else continue;end for;return opt;end function
yon=function(str);if str.lower.search("y") then return true;if tp(["n", "no"].indexOf(str.lower)) == "number" then return false;return null;end function
search=function(originalStr, string);if typeof(originalStr.indexOf(string)) != "number" then return false;return true;end function


DB={"items":{}, "rootFolder":"/root/blackbox/db"}
DB.get_path=function(nameSpace)
  return DB.rootFolder+"/."+nameSpace
end function
DB.gp=@DB.get_path
DB.generate_readme=function(nameSpace)
  hc.touch(DB.gp(nameSpace), "README.md")
  path=DB.gp(nameSpace)+"/README.md"
  file=objects.nf(hc.File("/"), path)
  if not tp(file) == "file" then return false
  file.set_content("blbx system message: "+c10+" this is a database folder named '"+nameSpace+"'."+c10+reveal(" all db files are currently hidden. ", (status.hide_db_files))+c10+" DO NOT EDIT THIS FOLDER.")
  file.chmod("u-rwx");file.chmod("g-rwx");file.chmod("o-rwx")
  return true
end function

DB.choose=function(nameSpace)
  if nameSpace.split("/").len == 1 then nameSpace=DB.gp(nameSpace)+"/."+nameSpace
  file=objects.nf(hc.File("/"), nameSpace)
  if not tp(file) == "file" then return false else return file
end function

DB.addFile=function(nameSpace, text=0)//configure: "hide_db_sys": 1
	folder=objects.nf(hc.File("/"), DB.gp(nameSpace))
	if not folder then return null
  name="."+nameSpace+"-"+str(folder.get_files.len)
	hc.touch(folder.path, name)
	testf=hc.File(folder.path+"/"+name)
  if not text then testf.set_content(JSON.write({}))
	return testf
end function

DB.create=function(nameSpace)
  DB.generate_readme(nameSpace)
  if nameSpace.lower.search("dict") or nameSpace.lower.search("bank") or nameSpace.lower.search("mail") then DB.addFile(nameSpace, 1) else DB.addFile(nameSpace)
	return true
end function

DB.extract_map=function(nameSpace)
  database=DB.choose(DB.gp(nameSpace))
  if tp(database) != "file" then return null
  database=database.get_files
  m={}
  for file in database;if file.name.lower.search("readme") then continue;m=m+JSON.read(file.get_content);end for
  return m
end function
DB.extract_list=function(nameSpace)
  database=DB.choose(DB.gp(nameSpace))
  if tp(database) != "file" then return null
  database=database.get_files
  l=[]
  for file in database
    if file.name.lower.search("readme") then continue
    l=l+file.get_content.split(" ")
  end for
  //for file in database;if file.name.lower.search("readme") then continue;for i in file.get_content.split(" "); l.push(i);end for;end for
  return l
end function
DB.glue_map=function(keyl, valuel);map={};if keyl.len != valuel.len then return false;for i in range(0, keyl.len-1);map[keyl[i]]=valuel[i];end for;return map;end function
DB.split_map=function(map, max_size=10000)
  temp=map
  master={"0":{}};ind=-1;ide=-1;
  total_len=function();count=0
    for i in master.values
      count=count+i.len
    end for;return count;end function
  while not total_len() >= map.len
    rco=master.values[-1]//recent_child_object
    ind=ind+1
    if not master.hasIndex(str(ind)) then
      master[str(ind)]={};continue
    end if
    while rco.len < max_size
      ide=ide+1
      if ide >= max_size then break
      wait(.1)
      ti=temp.indexes[:1];tv=temp.values[:1]
      rco[ti[0]]=tv[0];temp.pop
    end while
    ind=ind+1
    master[str(ind)]={}
  end while
  return master
end function

DB.addTo=function(dataset, nameSpace)//database as in DB.choose(DB.get_path(nameSpace))
	//make the file be the last file in the list. if the last file is full, then make a new file and recursively call the function.
  if dataset == [] then return true
  if tp(dataset) != "map" and tp(dataset) != "list" then exit(c("r")+"*** DB.addTo: param (dataset) must be a map object! ***")
  database=DB.choose(DB.gp(nameSpace))
	if not database then return false else database=DB.choose(DB.gp(nameSpace)).get_files
  if not database.len then DB.generate_readme(nameSpace)
  if database.len == 1 then ;DB.addFile(nameSpace);database=DB.choose(DB.gp(nameSpace)).get_files;end if
  file=database[-1]

  if tp(dataset) == "list" then
    if file.get_content.len >= 30000 then ;DB.addFile(nameSpace, 1);DB.addTo(dataset, nameSpace);end if
    while dataset.len > 0
      i=dataset[0]
      if file.get_content.len >= 30000 then ;DB.addFile(nameSpace, 1);DB.addTo(dataset, nameSpace);break;end if
      try=file.set_content(file.get_content+reveal("", (not file.get_content.len), " ")+i.join(" "))
      dataset.pull
    end while
    return true
  end if
  content_map=JSON.read(file.get_content)
  if dataset.len >= 10000 then
    temp=DB.split_map(dataset);templ=temp.values
    for i in templ
      if file.get_content.len >= 30000 then ;DB.addFile(nameSpace);DB.addTo(i, nameSpace);continue;end if
      DB.addTo(i, nameSpace)
    end for
  end if
  content_map=content_map+dataset
  file.set_content(JSON.write(content_map))
  return true
end function

DB.set=function(dataset, nameSpace)
  database=DB.choose(DB.gp(nameSpace))
  if tp(database) != "file" then return null
  if tp(dataset) == "list" then
    dataset=dataset.combine
    if not dataset.len then return false
  end if
  store=DB.reset(nameSpace)
  DB.addFile(nameSpace)
  if store then DB.addTo(dataset, nameSpace) else return false
  return true
end function

DB.has=function(entry, nameSpace)
	database=DB.choose(DB.gp(nameSpace))
	if typeof(database) != "file" then return null
	database=database.get_files
  map={}
  for file in database;if file.name.lower=="readme.md" then continue;map=map+JSON.read(file.get_content);end for
  if map == {} then return false
  if map.hasIndex(entry) or tp(map.indexes.indexOf(entry)) == "number" or tp(map.values.indexOf(entry)) == "number" then return true
  return false
end function

DB.reset=function(nameSpace)
	database=DB.choose(DB.gp(nameSpace))
	if not database then return false else database=database.get_files
  for file in database;if file.name.lower.search("readme") then continue;file.delete;end for
	return true
end function

misc.macro_db_map=function();newm={}
  for i in DB.extract_map("macro")
    if not (i.value.len) then continue
    newm[i.key]=i.value
  end for
  return newm
end function


grab_ports=function(ip, l2=[], all=0)
  //print(ip)
  //print(get_router(ip))
  match_list=[];l1=get_router(ip).used_ports
  if all != 0 then return l1
  for i in l1
    if tp(l2.indexOf(str(i.port_number))) == "number" then match_list.push(i)
  end for
  return match_list
end function

get_flags=function(comparisons, comparepoint, global=0);res=0;resl=[]
  found=[]
  for i in comparisons
    if tp(found.indexOf(i)) == "number" then continue
    found.push(i)
    if comparepoint.search(i) and global then resl.push(i)
    if comparepoint.search(i) and not global then ;res=i;break;end if;
  end for

  if global then return resl
  if not res then return null
  return [res]
end function

format_list=function(input_list)
  if not tp(input_list) == "list" then return false
  res="";count=0
  for i in input_list
    count=count+(i.len+1)
    res=res+b+(i.color("purple"))+reveal(c10, (count>25), " ")
    if count > 25 then count=0
  end for
  while res[-1] == c10; res=res[:-1];end while
  return res+c10
end function

get_file=function(input, entry_file, folders_only, search=0)
  if not search then search={"bool":0, "all":0}
  newm={}
  for i in ["bool", "all"]
    if not tp(search.indexOf(i)) == "number" then ;newm[i]=0;continue;end if
    newm[i]=1
  end for
  search=newm
  //announce("search", search)
  if input.split("/").len > 1 then
    file=objects.nf(entry_file, input)
    if not file then return false
    return file
  end if
  result=[]
  if not search.bool then //this is what will happen most of the time:
    curr_file=objects.nf(entry_file, nav.get())
    //it's looking for /root/2 in the curr directory, and its not there.
    if folders_only then child_list=curr_file.get_folders else child_list=curr_file.get_folders+curr_file.get_files
    found=[]
    for i in child_list
      if i.name.lower.search(input.lower) then
        found.push(i.name.lower)
        result.push(i)
      end if
    end for
  else
    if search.all then file=objects.nf(entry_file, 0, input, 1) else file=objects.nf(entry_file, 0, input)
    return file
  end if
  //announce("found", found)
  if not found.len then return false
  if found.len > 1 then
    for i in found ;if i.lower == input.lower then return objects.nf(entry_file, 0, input.lower);end for
    return format_list(found)
  end if
  //announce("result", result)
  return result[0]
end function

connect_to_wifi=function();wifi_info=objects.nf(hc.File("/"), 0, "Gift.txt")
  co=get_library("crypto.so");co.airmon("start", "wlan0")
  if tp(co) == "null" then exit "*** missing 'crypto.so' library. wifi connection failed ***".color("red")
  try=0
  if tp(wifi_info) == "file" and wifi_info.get_content.split(c10)[0] == "Wifi access:" then
    bssid=wifi_info.get_content.split(c10)[3]
    essid=wifi_info.get_content.split(c10)[4]
    passwd=wifi_info.get_content.split(c10)[5].split(": ")[1]
    try=hc.connect_wifi("wlan0", bssid, essid, passwd)
    print notify("gift.txt found. attempting connection")+c0
    if try == 1 then ;print notify("connected to '"+essid+"'.", "!")+c0;return true;end if
    if tp(try) == "string" then ;print notify(try.lower.color("black black white"), "?")+c0;end if
    if tp(try) == "null" then ;print notify(("failed to connect to '"+essid+"'").color("black black white"), "?")+c0;end if
  end if
  if not try then ;print notify("'Gift.txt' not found, proceeding...", "!")+c0;wait(2);end if

  bl=[];el=[];pl=[]
  for i in hc.wifi_networks("wlan0")
    i=i.split(" ")
    bl.push(i[0]);el.push(i[2]);pl.push(i[1][:-1].to_int)
  end for

  sorted=[];for i in pl;sorted.push(i);end for;sorted.sort
  ind=pl.indexOf(sorted[-1])
  bssid=bl[ind];essid=el[ind];pwr=(300000/pl.sort[-1])
  file_capture=objects.nf(hc.File("/"), 0, "file.cap")

  if tp(file_capture) != "file" or tp(file_capture) == "file" and tp(co.aircrack(file_capture.path)) == "null" then

    add_line
    print notify(" hacking '"+essid+"'. target ack count is "+str(round(pwr))+". ", "!")+c0
    add_line

    try2=co.aireplay(bssid, essid, pwr)
    if tp(try2) == "string" then ;print notify(" "+try+" ", "?")+c0;return false;end if
  end if

  passwd=co.aircrack(objects.nf(hc.File("/"), 0, "file.cap").path)
  try=hc.connect_wifi("wlan0", bssid, essid, passwd)
  if tp(try) == "string" then ;print notify((" "+try.lower+" ").color("black black white"), "?")+c0;end if
  if tp(try) == "null" then ;print notify((" failed to connect to '"+essid+"' ").color("black black white"), "?")+c0;end if
  if try == 1 then print notify(" connected to '"+essid+"'. ", "!")+c0
  wait(3);cs
  return true
end function

clause=function(ifCondition, thenAction, elseAction=1)
  if ifCondition then return thenAction else return elseAction
end function

get_payloads=function(lib, check=0, mem=0)
  db_map=DB.extract_map("exploit")
  name=lib.lib_name;ver=lib.version
  if not db_map.len then return false
  if (not db_map.hasIndex(name)) then return false
  if (db_map.hasIndex(name) and not db_map[name].hasIndex(ver)) then return false
  if check then return true

  meml_owned=db_map[name][ver].indexes;matches=[];payl=[]
  for memo in meml_owned;if not mem then ;payl=payl+db_map[name][ver][memo]; else ;if memo==mem then ;payl=db_map[name][ver][memo];break;end if;end if;end for
  return payl
end function

add_exploit=function(entry_map, lib, verbose=1)
  add_line
  if verbose then print b+("storing to: "+lib.lib_name+" v"+lib.version).color("black")+c0
  sv=DB.extract_map("exploit")
  name=lib.lib_name;ver=lib.version
  for i in entry_map
    if not sv.len or (sv.len > 0 and not sv.hasIndex(name)) then ;sv[name]={};end if
    if not sv[name].len or (sv[name].len > 0 and not sv[name].hasIndex(ver)) then ;sv[name][ver]={};end if
    if not sv[name][ver].len or (sv[name][ver].len > 0 and not sv[name][ver].hasIndex(i.key)) then ;print b+("adding "+i.key).color("purple")+c0;sv[name][ver][i.key]=i.value;continue;end if
    sv[name][ver][i.key]=(sv[name][ver][i.key]+i.value).remove_repeats
  end for
  DB.set(sv, "exploit")
  return true
end function

execute=function(net, third, lanip, scan=0, changePasswords=0);memories=""
  lib=net.dump_lib
  if tp(ip.lanList.indexOf(lanip)) != "number" then ip.lanList.push(lanip)
  if tp(mx.rshell_server) != "list" then orshl=[] else orshl=mx.rshell_server

  if orshl.len > 0 then ;for obj in orshl;objects.add(obj, obj.host_computer.lan_ip);end for;end if
  if not scan and get_payloads(lib, 1) then scan=0 else scan=1
  if not scan then
    print bar(40)+c0
    print b+(" found "+lib.lib_name+" "+lib.version).color("black purple purple")+c0
    db_map=DB.extract_map("exploit")
    memories=db_map[lib.lib_name][lib.version].indexes
    print b+(" stored addresses: ".color("black")+str(memories.len).color("purple"))+c10+c0
    for m in memories
      unsafe_vals=get_payloads(lib, 0, m)
      for p in unsafe_vals
        if changePasswords then obj=lib.overflow(m, p, third) else obj=lib.overflow(m, p)
        if tp(obj) == "null" then objects["null"].list.push([obj, tp(obj), m, p, lanip])
        objects.allocate(obj, lanip)
      end for
    end for
    print notify("recon for "+("'"+hide_ip(ip.pub)+"'").color("black black white")+" @ "+("'"+hide_ip(lanip)+"'").color("black black white")+" completed.")+c0
    add_line
    return true
  end if
  db_entrym={}
  print bar(40)+c0
  printb(("scanning "+lib.lib_name+" "+lib.version).color("black purple purple"))
  memories=mx.scan(lib)
  for m in memories;unsafe_vals=[];output=mx.scan_address(lib, m);for line in output.split(c10);if tp(line.indexOf("</b>.")) == "number" then;unsafe_vals.push(slice(line, line.indexOf("<b>"), line.indexOf("</b>"))[3:]);end if;end for;
    db_entrym[m]=unsafe_vals
    for p in unsafe_vals
      if changePasswords then obj=lib.overflow(m, p, third) else obj=lib.overflow(m, p)
      if tp(obj) == "null" then objects["null"].list.push([obj, tp(obj), m, p, lanip])
      objects.allocate(obj, lanip)
    end for
  end for
  print notify("recon for "+("'"+hide_ip(ip.pub)+"'").color("black black white")+" @ "+("'"+hide_ip(lanip)+"'").color("black black white")+" completed.")+c0
  add_exploit(db_entrym, lib)
  return true
end function

collect=function(add=0)
  for lan in ip.lanList
    device.add(lan)
    if not user.tree.hasIndex(lan) then user.tree[lan]={}
    if not device.user_list.hasIndex(lan) then device.user_list[lan]=[]
    for obj in objects.file.list+objects.shell.list+objects.computer.list;if lan != obj[2] then continue;name=obj[1];if not user.tree[lan].hasIndex(name) then ;user.add(lan, name);device.user_list[lan].push(name);end if
    //announce("name", name+" "+lan)
    //announce("object", tp(obj[0]))
    if tp(obj[0]) == "shell" then user.tree[lan][name].s=obj[0]
    if tp(obj[0]) == "computer" then user.tree[lan][name].c=obj[0]
    if tp(obj[0]) == "file" then user.tree[lan][name].f=obj[0]
    ;end for
  end for
end function

trojan.build=function(src_name, code, obj_list, params=0, run=1, delete=1)
  if not run then delete=0
  comp = objects.borrow("computer")
  shell = objects.borrow("shell")
  file = objects.borrow("file")
  tf = device.get_vuln_dir()
  if not tf then return {"status":0, "data":"no vulnerable directories found..."}
  tfp = reveal("", (tf.path=="/") , tf.path)
  src_name = "." + src_name
  src_path = tfp + "/"+src_name
  bin_name = src_name[:-4] //removes '.src'

  try = comp.touch(reveal("/", (tfp=="") , tfp), src_name)
  ref = comp.File(src_path)
  
  if not try then return {"status": 0, "data": "could not create src file, permission denied..."}
  
  if not ref then return {"status":0, "data":"permission denied..."}
  
  ref.set_content(code)
  store=shell.build(ref.path, reveal("/", (tfp==""), tfp))
  if tp(store) == "string" and store.len > 0 then ;return {"status":0, "data":store};end if
  ref2=comp.File(tfp+"/"+bin_name)
  //print b+("writing source code...".color("black"))+c0
  //print b+("compiling binary...".color("black"))+c0
  add_line
  if run then
    printb(("running" + (bin_name).c("purple") + "...").color("black"))
    if not params then try=shell.launch(tfp+"/"+bin_name) else try=shell.launch(tfp+"/"+bin_name, params)
    if tp(try) == "string" then ;return {"status":0, "data":try}
  end if
  if delete then
    ref.delete
    ref2.delete
  end if
  return {"status":1, "data":0}
end function

clear_logs=function(is_verbose=0)
  file=objects.borrow("file");res=0
  if not file then return
  file_list=objects.nf(file, 0, 0, 1)
  for f in file_list
    f=f[0]
    if f.is_folder then continue
    res=f;break
  end for
  if not file then return reveal(c10+b+("no file objects stored from victim machine...").color("black"), (is_verbose), b+"couldn't corrupt logs...".color("black"))+c0
  if not res then return reveal(c10+b+("no vulnerable files found on victim machine...").color("black"), (is_verbose), b+"couldn't corrupt logs...".color("black"))+c0
  try=res.move("/var", "system.log")
  return b+reveal((reveal(c10+b+("logs: "+try+"...").color("black"), (is_verbose), "couldn't corrupt logs...")).color("black") , (not try or (tp(try) == "string" and try.len > 0)), b+("logs corrupted".color("black")))+c0
end function

action={}
action.migrate=function(lanip, user=0, run=0)
  if not status.is_active then return {"status":0, "data":"must [connect] to a victim..."}
  if user!=0 then
    obj_m={"s":objects.parse(objects.shell.list, lanip, user)}
    if tp(obj_m.s) != "shell" then return {"status":0, "data":"no shell objects from current user stored..."}
    obj_m.c=obj_m.s.host_computer
    obj_m.f=obj_m.c.File("/")
  else
    obj_m={"s":objects.borrow("shell")}
    if tp(obj_m.s) != "shell" then return {"status":0, "data":"no shell objects from current user stored..."}
    obj_m.c=obj_m.s.host_computer
    obj_m.f=obj_m.c.File("/")
  end if
  vd=device.get_vuln_dir() //vd = vulnerable_directory
  if not vd then return {"status":0, "data":"no vulnerable dirs found..."}

  find_pn=objects.nf(obj_m.f, program_path)
  if not tp(find_pn) == "file" or (tp(find_pn) == "file" and not find_pn.is_binary) or (tp(find_pn) == "file" and find_pn.is_binary and find_pn.is_folder) then
    printb("blbx not found on target machine...".color("black"))
    printb("sending...".color("black"))
    try=gs.scp(program_path, vd.path, obj_m.s)
    if tp(try) == "string" then return {"status":0, "data":parse_error(try, 0, 0)}
    find_pn=objects.nf(obj_m.f, vd.path+"/"+program_path.split("/")[-1])
    add_line
  end if

  printb("migration commencing...".color("black"))
  printb("program path: ".color("black")+(find_pn.path).color("purple"))
  if run then
    add_line
    printb("starting shell session...".color("black"))
    obj_m.s.start_terminal
  end if
  return {"status":1, "data":""}
end function

action.secure=function(root, undo=0)
  if not tp(root)=="file" then return false
  printb("commencing security sweep...".color("black"))
  printb("modifying file permissions...".color("black"));add_line
  file_system=objects.nf(root, 0, 0, 1)
  avoid_files=["terminal", "/bin"];cont=0
  remove_files=["/etc/passwd"]
  time_log=[]
  time_log.push(time)
  for file in file_system
    file=file[0]
    for item in avoid_files
      if file.path.lower.search(item) then ;cont=1;break; end if
    end for
    if cont then ;cont=0;continue; end if
    if not undo then
      for item in remove_files
        if file.path.lower.search(item) then ;printb("removing ".color("black")+shorten_path(file.path).color("purple"));cont=1;file.delete;break; end if
      end for
      if cont then ;cont=0;continue; end if
    end if
    for type in "ugo".values
      try=file.chmod(type+reveal("+wrx", (undo), "-wrx"))
      //res=reveal("failed".color("black"), (tp(try)=="string" and try.len > 0), "success".color("purple"))
    end for
  end for
  time_log.push(time)
  time_elapsed=time_log[1]-time_log[0]
  add_line
  printb("time elapsed: ".color("black")+(str(time_elapsed) + " sec").color("purple"))
  add_line
end function

action.purge=function(file)
  if tp(file) != "file" then return false
  while file.path != "/"; file=file.parent ;end while
  printb("mass delete commencing...".color("black"))
  name_list=[]
  for i in file.get_folders
    name_list.push(i.name)
  end for
  count=-1
  for i in file.get_folders
    count=count+1
    try=i.delete
    if tp(try) == "string" and try.len > 0 then
      printb((i.name+": failed").color("black"))
      continue
    end if
    printb((name_list[count]+": ").color("black")+"success".color("purple"))
    wait(.3)
  end for
  add_line
  return true
end function
action.login=function()
  login=JSON.read(objects.nf(hc.File("/"), "/root/blackbox/json/ruse.json").get_content.dec).login
  try=ui(next+box("blbx")+wisp+box("password")+next+box("#")+"> ".color("purple")+c("b")+b, 1)
  while try != reveal(str(login), (tp(login) == "number"), login) and not ["back", "exit"].has(try)
    try=ui(next+box("blbx")+wisp+box("password")+next+box("#")+"> ".color("purple")+c("b")+b, 1)
  end while
  if ["back", "exit"].has(try) then exit
end function

aux={}
aux.exploits=function()
  internal={};mem_list=[];name_list=[]
  db_map=DB.extract_map("exploit")
  for name in db_map.indexes
    name_list.push(name)
    for ver in db_map[name].indexes
      mini_map=db_map[name][ver]
      for mem in mini_map.values
        mem_list=mem_list+mem
      end for
    end for
  end for
  return {"name_list":name_list, "mem_list":mem_list}
end function

login={}
login.info={"blockchain":0, "email":0}
login.blockchain=function()
  bl=get_library("blockchain.so")
end function
login.email=function()

end function

coming_soon=function()
  printb((" has not been implemented."+c10+" coming soon.").color("purple black"))
end function

to_be_determined=function(purpose=0)
  if tp(purpose) == "string" then ;while purpose[0] == " " ;purpose=purpose[1:]; end while;if purpose[0] != " " then purpose=" "+purpose; end if
  printb(shorten_dialogue("command is under development."+reveal(c10(2)+" function: "+c10+purpose+c10(2)+" if you would like to see this implemented, contact Ikodane#1353 on discord.", (purpose!=0), c10(2)+" function: not displayed."+c10(2)+" the developer will personally decide on continued implementation."), 0).color("black black"))
end function
tbd=@to_be_determined
//internal.so
