validate_code=function(code)
    open_blocks=["function", "if", "for", "while"]
    close_blocks=["end function", "end if", "end for", "end while"]
    block_map={"function":"end function", "if":"end if", "for":"end for", "while":"end while"}

    starts_with=function(line, prefix)
        if line.len < prefix.len then
            return false
        end if
        return line[0:prefix.len] == prefix
    end function

    contains=function(line, substring)
        return line.indexOf(substring) != null
    end function

    get_block_type=function(line)
        for keyword in open_blocks
            if starts_with(line, keyword) or contains(line, " "+keyword+"(") then
                return keyword
            end if
        end for
        return null
    end function

    validate_recursively=function(lines, stack, index)
        result={"valid":true, "errors":[]}

        if index > lines.len then
            if stack.len == 0 then
                result.valid=true
            else
                result.valid=false
                result.errors.push("Unclosed block(s): "+stack.join(", "))
            end if
            return result
        end if

        line=lines[index].trim()

        block_type=get_block_type(line)
        if block_type then
            stack.push(block_type)
            return validate_recursively(lines, stack, index + 1)
        end if

        for keyword in close_blocks
            if starts_with(line, keyword) then
                if stack.len == 0 then
                    result.valid=false
                    result.errors.push("Unexpected closing block: "+keyword+" at line "+str(index))
                    return result
                end if

                last_block=stack.pop()
                if block_map[last_block] != keyword then
                    result.valid=false
                    result.errors.push("Mismatched block: "+last_block+" expected "+block_map[last_block]+", found "+keyword+" at line "+str(index))
                    return result
                end if

                return validate_recursively(lines, stack, index + 1)
            end if
        end for

        return validate_recursively(lines, stack, index + 1)
    end function

    lines=code.split("\n")

    validation_result=validate_recursively(lines, [], 1)

    if validation_result.valid then
        return "Code is valid."
    else
        return "Code has inconsistencies: "+validation_result.errors.join("\n")
    end if
end function

file_path="/root/result.txt"
file_content=get_shell.host_computer.File(file_path).get_content()
print(validate_code(file_content))
