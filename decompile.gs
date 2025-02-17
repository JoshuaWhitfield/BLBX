file = get_shell.host_computer.File("/root/decompile.txt")
resultFile = get_shell.host_computer.File("/root/result.txt")
arr = file.get_content.split("""")
//print arr
result = ""
idx = -1
for line in arr 
	idx = idx + 1
	print line
    if line == ".quote+" then continue
	if line == "+" then continue
	if line == """" then continue
	if line == " " then 
		result = result + char(9)
	end if
	if line == "" and typeof([0, arr.len-1].indexOf(idx)) != "number" then 
		result = result + """" + """"
	end if
	if arr.hasIndex(arr.indexOf(line) + 1) then 
		if arr[arr.indexOf(line) + 1] == ".quote+" then 
			result = result + """" + line + """"
			continue
		end if
	end if
    result = result + line
end for

result = result.split(";").join(char(10))

resultFile.set_content(result)
