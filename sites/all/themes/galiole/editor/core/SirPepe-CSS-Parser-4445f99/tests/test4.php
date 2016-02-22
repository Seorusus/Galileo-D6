<?php
	if($_POST['css']){
		if($_POST['debug']){
			echo '<pre>';
		}
		include('../parser.php');
		if($_POST['css']){
			$parser = CssParser::factory()
				->set_debug($_POST['debug'])
				->load_string(stripslashes($_POST['css']))
				->parse();
		}
		if($_POST['debug']){
			echo '</pre>';
		}
	}
?>


<table>
	<tr>
		<td valign="top">
			<h2>Original</h2>
			<pre><?php if($_POST['css']) { echo $parser->css; } ?></pre>
		</td>
		<td valign="top">
			<h2>Zerlegt</h2>
			<pre><?php if($_POST['css']) { print_r($parser->parsed); } ?></pre>
		</td>
		<td valign="top">
			<h2>Zusammengesetzt</h2>
			<pre><?php if($_POST['css']) { echo $parser->glue($_POST['compress']); } ?></pre>
		</td>
	</tr>
</table>


<form action="test4.php" method="post">
	<textarea cols="120" rows="20" name="css"><?php if($_POST['css']): echo stripslashes($_POST['css']); else: ?>@import url("foo.css");

@import "bar.css" screen;


/* Komentar! */
@media projection {
	#blubb {
		font-weight: /* Komentar! */ bold;
		content:';{!""())!"';
	}
}
#gnnf{
	background:green url('img/beispiel.png') top left no-repeat;
	text-align:left
}

/**
 * FETTER Komentar!
 * 
 * Bla bla bla
 */
@media screen {
	#test[foo] {
		color:red !important;
	}
	#test[foo] {
		color:blue;
	}
}
#blah[rel="/{_-;!"] div > #blargh span.narf {
	background:green;
	text-align:left;
}
/* Komentar! */
@media print {
	#gnarf {
		font-weight:normal;
		font-size:2em
	}
}
#foobar {
	font-family:"Trebuchet MS", Verdana, Arial, sans-serif;
}<?php endif; ?></textarea>
<br>
<label><input type="checkbox" name="debug" value="1"> Debug</label>
<br>
<label><input type="checkbox" name="compress" value="1"> Kompression</label>
<br>
<input type="submit">
</form>