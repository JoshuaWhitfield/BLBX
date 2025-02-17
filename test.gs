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
      print third
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
  collect()
  return true
end function
