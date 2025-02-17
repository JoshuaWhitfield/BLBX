c0=char(0)
c10=char(10)
c33=char(33)
tp=@typeof
cs=@clear_screen
ui=@user_input
gs=get_shell
hc=gs.host_computer
b="<b>"
u="<u>"
b2="</b>"
u2="</u>"
color={"map":{"b":"#707070", "p":"#7A53F6", "w":"#BEB9E7FF", "r":"red"}}
obj=get_custom_object
toolbox=obj.data
add_line=function()
print c0
end function
c=function(str)
  if tp(color.map.indexes.indexOf(str)) == "number" then return "<color="+color.map[str]+">"
  if tp(str.indexOf("<color=")) == "number" then return str
  return "<color="+str+">"
end function
string.color=function(string_split_by_space="black black black")
list=string_split_by_space.split(	" ")
  if not string_split_by_space.len then string_split_by_space="black black black"
  colorm={"black":"<#707070>", "white":"<#BEB9E7FF>", "purple":"<#7A53F6>", "pink":"<#ED2EEA>", "red":"<color=red>", "dark_red":"<#731313>", "blue":"<color=blue>", "green":"<#2BB930>", "dark_green":"<#2C6407>", "cyan":"<#32E3EF>", "yellow":"<#D2DE0F>", "brown":"<#674D06>", "orange":"<#EA9512>"}
  alpha="qwertyuiopasdfghjklzxcvbnm"
  number="1234567890"
  symbol="!@#$%^&*()_+-={}|[]\:'<>?,./"
  check_all=function()
    res=1
    for i in list
      if not colorm.hasIndex(i) then res=0 break
    end for
    return res
  end function
  if not check_all() then return false
  while list.len < 3
 list.push(list[-1])
 end while
coa=colorm[list[0]]
con=colorm[list[1]]
cos=colorm[list[2]]
curr_color=coa
curr_type="alpha"
newl=[]
fp=1
  for char in self.values
    is_a=(tp(alpha.indexOf(char.lower)) == "number")
is_n=(tp(number.indexOf(char)) == "number")
is_s=(tp(symbol.indexOf(char)) == "number")
    if char==c10 then 
newl.push(char+curr_color)
continue
end if
    if is_a then curr_type="alpha"
if is_n then curr_type="number"
if is_s then curr_type="symbol"
    if curr_type=="alpha" then
      if curr_color!=coa or (curr_color==coa and fp) then curr_color=coa else curr_color=
fp=0
      newl.push(curr_color+char)
curr_color=coa
continue
    end if
    if curr_type=="number" then
      if curr_color!=con or (curr_color==con and fp) then curr_color=con else curr_color=
fp=0
      newl.push(curr_color+char)
curr_color=con
continue
    end if
    if curr_type=="symbol" then
      if curr_color!=cos or (curr_color==cos and fp) then curr_color=cos else curr_color=
fp=0
      newl.push(curr_color+char)
curr_color=cos
continue
    end if
    newl.push(char)
  end for
  self=newl.join()
ctr=0
  for i in self
    if i == "<" then ctr=ctr+1
  end for
  for i in range(1,ctr)
    self=self+"</color>"
  end for
  return self
end function

print "check 1"

reveal=function(str, onCondition=0, elseShow=)
if onCondition then return str
return elseShow
end function
st="<s>"
est="</s>"
wisp=c("p")+"•"+c("w")+st+	" "+est+c("p")+"•"
box=function(str, opt=0, opt2=0)
return c("b")+b+"["+reveal(u, (not opt), 	" ")+c("p")+str+c("b")+reveal(u2, (not opt), 	" ")+"]"
end function
notify=function(str, type="!")
return c10+box(type.color("white"),1)+wisp+box(str,1)
end function
search=function(originalStr, string)
if typeof(originalStr.indexOf(string)) != "number" then return false
return true
 end function
objects={"shell":{"list":[]}, "computer":{"list":[]}, "file":{"list":[]}, "null":{"list":[]}, "number":{"list":[]}, "rshell":{"list":[]}, "nfl":[]}
osl=objects.shell.list
ocl=objects.computer.list
ofl=objects.file.list
orshl=objects.rshell.list
objects.parse=function(list, lan=0, loginAsUser=0, all=0)
if not list.len then return false
user_dict={+ root.quote +:[], + guest.quote + :[], + unknown.quote + :[], + usr.quote + :[]}
 for object_arr in list
 if object_arr[2] != lan and lan then continue
object = object_arr[0]
username = object_arr[1]
lanip = object_arr[2]
if loginAsUser then
if search(username.lower, loginAsUser.lower) then user_dict[  + usr.quote +  ].push(object)
continue
end if
if username == root.quote + then user_dict[root.quote +].push(object)
if username == guest.quote + then user_dict[guest.quote +].push(object)
if username ==  unknown.quote + then user_dict[unknown.quote +].push(object)
if not user_dict.hasIndex(username) then user_dict[usr.quote +].push(object)
end for
if not loginAsUser and lan and all then return user_dict.root + user_dict.guest + user_dict.unknown + user_dict.usr
if user_dict.root.len > 0 then return user_dict.root[0]
if user_dict.usr.len > 0 then return user_dict.usr[0]
if user_dict.unknown.len > 0 then return user_dict.unknown[0]
if user_dict.guest.len > 0 then return user_dict.guest[0]
end function
print "check 2"
objects.navfile=function(obj, path=0, name=0, all=0, firstpass=1)
  if firstpass!=0 then 
while obj.path != "/"
obj=obj.parent
end while
objects.nfl=[]
firstpass=0
end if
  if tp(path) == "string" and path == "/" then return obj
result=false
  if tp(path) == "string" and path[0] != "/" then path="/"+path
  if tp(path) == "string" and path[-1] == "/" then path=path[:-1]
  if tp(name) == "string" then name=name.lower
  if tp(path) == "string" then path=path.lower
  for i in obj.get_folders+obj.get_files
    if not all and tp(result) == "file" then 
objects.nfl=[]
return result
end if
    if all and [path,name] == [0,0] then objects.nfl.push([i, i.path, i.get_content, [i.is_folder,i.is_binary], i.name, i.size, i.permissions, i.owner, i.group])
    if (all and tp(name) == "string") and search(i.name.lower, name) then objects.nfl.push([i, i.path, i.get_content, [i.is_folder,i.is_binary], i.name, i.size, i.permissions, i.owner, i.group])
    if (tp(path)=="string" and [name,all]==[0,0]) and i.path.lower==path then 
result=i
objects.nfl=[]
return result
end if
    if (tp(name)=="string" and [path,all]==[0,0]) and search(i.name.lower, name) then 
result=i
objects.nfl=[]
return result
end if
    if ([path,name,all]==[0,0,0]) then obj.nfl.push([i, i.path, i.get_content, [i.is_folder,i.is_binary], i.name, i.size, i.permissions, i.owner, i.group])
    if i.is_folder then result=self.navfile(i, path, name, all, firstpass)
  end for

  if ([path,name,all]==[0,0,0]) or all then return objects.nfl
  objects.nfl=[]
return result
end function
objects.nf=@objects.navfile
objects.get_user=function(obj)
result=false
  if tp(obj) == "shell" then obj=obj.host_computer
  if tp(obj) == "computer" then obj=obj.File("/")

  if not tp(objects.nf(obj, "/root")) == "file" then file=[objects.nf(obj, "/boot/System.map"), objects.nf(obj, "/home")] else file=[objects.nf(obj, "/root"), objects.nf(obj, "/home")]
  if tp(file[0]) == "file" and file[0].has_permission("w") then return root
  if tp(file[1]) == "file" then file_list=file[1].get_folders
  users=[]
result=[]
  
  for f in file_list
if f.has_permission("w") then users.push(f.name)
end for

  if users.hasIndex(1) then return users[0]
  if tp(users.indexOf(guest)) == "number" then return guest
  return unknown
end function
print "check 3"
objects.allocate=function(obj, lanip)
  if tp(["shell", "computer", "file"].indexOf(tp(obj))) == "number" then print b+(tp(obj).color("purple"))+c0
  if tp(obj) == "number" then 
if obj then 
objects.number.list.push([obj])
end if
  if tp(obj) == "shell" then 
objects.add(obj, lanip)
objects.add(obj.host_computer, lanip)
objects.add(obj.host_computer.File("/"), lanip)
end if
  if tp(obj) == "computer" then 
objects.add(obj, lanip)
objects.add(obj.File("/"), lanip)
end if
  if tp(obj) == "file" then 
while obj.path!="/"
obj=obj.parent
end while
objects.add(obj, lanip)
end if
end function
objects.add=function(obj, lanip)
objects[tp(obj)].list.push([obj, objects.getUser(obj), lanip, tp(obj)])
end function
objects.wipe=function()
for i in objects.indexes
if tp(objects[i])!="map" then continue
objects[i].list=[]
end for
end function
objects.has=function(list)
if not list.len then return false
return true
end function
get_mx=objects.nf(hc.File("/"), 0, "metaxploit.so")
mx=include_lib(get_mx.path)

print "check 1"

get_library=function(name)
  try=objects.nf(hc.File("/"), 0, name, 1)
  if not try.len then return false
result=false
  for i in try
    if i[0].name == name then
      get_obj=mx.load(i[0].path)
			
			if search(tp(get_obj), "Lib") then
				result=get_obj
				break
			end if
    end if
  end for
  return result
end function
temp=get_library(toolbox.lib)
if not temp or tp(temp) == "null" then return {"data":0,"callback":0, "msg":" trojan -b: library '"+toolbox.lib+"' not found..."}
toolbox.lib=temp

get_payloads=function(lib, check=0, mem=0)
  db_map=toolbox.db
	ver=lib.version
name=lib.lib_name
	if not db_map.len then return false
  if (not db_map.hasIndex(name)) or (db_map.hasIndex(name) and not db_map[name].hasIndex(ver)) then return false
  if check then return true
  meml_owned=db_map[name][ver].indexes
payl=[]
  for memo in meml_owned
if not mem then 
payl=payl+db_map[name][ver][memo]
 else 
if memo==mem then 
payl=db_map[name][ver][memo]
break
end if
end if
end for
  return payl
end function
platter={"exploit":{}, "objects":0}

execute=function(lib, lanip)

	if get_payloads(lib, 1) and not toolbox.scan then
		print b+(" found "+lib.lib_name+	" "+lib.version).color("black purple purple")+c0
		memories=toolbox.db[lib.lib_name][lib.version].indexes
		print b+(" stored addresses: ".color("black")+str(memories.len).color("purple"))+c10+c0
		for m in memories
			unsafe_vals=get_payloads(lib, 0, m)
			for p in unsafe_vals
				res=lib.overflow(m, p, lanip)
				if tp(res) == "null" then objects["null"].list.push([res, tp(res), m, p, lanip])
	      objects.allocate(res, lanip)
			end for
		end for
		return true
	end if

	print b+("scanning: ".color("black"))+(lib.lib_name+	" "+lib.version+	" "+lanip).color("black purple purple")+c0
  memories=mx.scan(lib)
  for m in memories
unsafe_vals=[]
output=mx.scan_address(lib, m)
for line in output.split(c10)
if tp(line.indexOf("</b>.")) == "number" then
unsafe_vals.push(slice(line, line.indexOf("<b>"), line.indexOf("</b>"))[3:])
end if
end for

    platter.exploit[m]=unsafe_vals
    for p in unsafe_vals
      res=lib.overflow(m, p, lanip)
      if tp(res) == "null" then objects["null"].list.push([res, tp(res), m, p, lanip])
      objects.allocate(res, lanip)
    end for
  end for
	return true
end function
execute(toolbox.lib, toolbox.lan)
platter.objects=objects
obj.callback={"platter":platter}
print "check 4"
return obj
