 #!/bin/bash

name=''
if [ "$1" = 'full' ]; then
	name='.full'
	cat baku.js baku.math.js baku.number.js baku.date.js baku.regexp.js baku.string.js baku.string.formater.js baku.dom.js  | closure-compiler --js_output_file="baku$name.min.js"
elif [ "$1" = 'dom' ]; then
	name='.dom'
	cat baku.js baku.dom.js | closure-compiler --js_output_file="baku$name.min.js"
else 
	cat baku.js baku.math.js baku.number.js baku.date.js baku.regexp.js baku.string.js baku.string.formater.js | closure-compiler --js_output_file="baku$name.min.js"
fi
sed -i '1i/*! BakuJs v0.2 | (c) Zefling | license, see: github.com/Zefling/BakuJS */' "baku$name.min.js"