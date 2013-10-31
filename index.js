/*
 * fis
 * http://fis.baidu.com/
 */


function process(content){
    var reg = /\b(?:_\.Module\.|F)\.use\s*\(\s*("(?:[^\\"\r\n\f]|\\[\s\S])*"|'(?:[^\\'\n\r\f]|\\[\s\S])*'|(?:\[[^\[\]]+?\]))\s*|\brequires\s*:\s*\[([^\]]+)]|"(?:[^\\"\r\n\f]|\\[\s\S])*"|'(?:[^\\'\n\r\f]|\\[\s\S])*'|\/\/[^\r\n\f]+|\/\*[\s\S]*?(?:\*\/|$)/g;
    var lang = fis.compile.lang.require;
    return content.replace(reg, function(m, $1, $2){
        if($1 || $2){
            m = m.replace(/"(?:[^\\"\r\n\f]|\\[\s\S])*"|'(?:[^\\'\n\r\f]|\\[\s\S])*'/g, function(mm){
                return lang.ld + mm + lang.rd;
            });
        }
        return m;
    });
}


'use strict';
module.exports = function(content, file){
    if(file.isHtmlLike){
        var reg = /(<script(?:\s+[\s\S]*?["'\s\w\/]>|\s*>))([\s\S]*?)(?=<\/script>|$)/ig;
        return content.replace(reg, function(m, $1, $2){
            return $1 + process($2);
        });
    } else if(file.isJsLike){
        return process(content);
    }
};