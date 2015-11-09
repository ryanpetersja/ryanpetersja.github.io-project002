// JavaScript Document
"use strict";
var div;
var blink;
var timing;
var blankSpacesUp;
var blankSpacesDown;

window.onload = function ()
{
	var puzzlearea = document.getElementById('puzzlearea');
	
	div = puzzlearea.getElementsByTagName('div');

	for (var i=0; i<div.length; i++)
	{
		div[i].className = 'puzzlepiece';
		div[i].style.left = (i%4*100)+'px';
		div[i].style.top = (parseInt(i/4)*100) + 'px';
		div[i].style.backgroundPosition= '-' + div[i].style.left + ' ' + '-' + div[i].style.top;
		div[i].onmouseover = function()
		{
			if (checkCanMove(parseInt(this.innerHTML)))
			{
				this.style.border = "3px solid red";
				this.style.color = "#006600";
                this.style.backgroundImage="url('https://s-media-cache-ak0.pinimg.com/originals/71/60/78/7160787b0ba51dd6d958936736fa97f3.jpg')"; 

			}
		};
		div[i].onmouseout = function()
		{
			this.style.border = "5px solid black";
			this.style.color = "#000000";
		};

		div[i].onclick = function()
		{
			if (checkCanMove(parseInt(this.innerHTML)))
			{
				swap(this.innerHTML-1);
				if (checkFinish())
				{
					youWin();
				}
				return;
			}
		};
	}

	blankSpacesDown = '300px';
	blankSpacesUp = '300px';

	var shufflebutton = document.getElementById('shufflebutton');
	shufflebutton.onclick = function()
	{

		for (var i=0; i<250; i++)
		{
			var rand = parseInt(Math.random()* 100) %4;
			if (rand == 0)
			{
				var tmp = calcUp(blankSpacesDown, blankSpacesUp);
				if ( tmp != -1)
				{
					swap(tmp);
				}
			}
			if (rand == 1)
			{
				var tmp = calcDown(blankSpacesDown, blankSpacesUp);
				if ( tmp != -1) 
				{
					swap(tmp);
				}
			}

			if (rand == 2)
			{
				var tmp = calcLeft(blankSpacesDown, blankSpacesUp);
				if ( tmp != -1)
				{
					swap(tmp);
				}
			}

			if (rand == 3)
			{
				var tmp = calcRight(blankSpacesDown, blankSpacesUp);
				if (tmp != -1)
				{
					swap(tmp);
				}
			}
		}
	};
};

function checkCanMove(pos)
{
	if (calcLeft(blankSpacesDown, blankSpacesUp) == (pos-1))
	{
		return true;
	}

	if (calcDown(blankSpacesDown, blankSpacesUp) == (pos-1))
	{
		return true;
	}

	if (calcUp(blankSpacesDown, blankSpacesUp) == (pos-1))
	{
		return true;
	}

	if (calcRight(blankSpacesDown, blankSpacesUp) == (pos-1))
	{
		return true;
	}
}
function Blink()
{
	blink --;
	if (blink == 0)
	{
		var body = document.getElementsByTagName('body');
		body[0].style.backgroundColor = "#FFFFFF";
		alert('you win');
		return;
	}
	if (blink % 2)
	{
		var body = document.getElementsByTagName('body');
		body[0].style.backgroundColor = "#00FF00";	
	}
	else
	{
		var body = document.getElementsByTagName('body');
		body[0].style.backgroundColor = "#FF0000";
	}
	timing = setTimeout(Blink, 100);
}

function youWin()
{
	var body = document.getElementsByTagName('body');
	body[0].style.backgroundColor = "#FF0000";
	blink = 10;
	timing = setTimeout(Blink, 100);
}

function checkFinish()
{
	var flag = true;
	for (var i = 0; i < div.length; i++) {
		var y = parseInt(div[i].style.top);
		var x = parseInt(div[i].style.left);

		if (x != (i%4*100) || y != parseInt(i/4)*100)
		{
			flag = false;
			break;
		}
	}
	return flag;
}

function calcLeft(x, y)
{
	var xx = parseInt(x);
	var yy = parseInt(y);

	if (xx > 0)
	{
		for (var i = 0; i < div.length; i++) 
		{
			if (parseInt(div[i].style.left) + 100 == xx && parseInt(div[i].style.top) == yy)
			{
				return i;
			} 
		}
	}
	else 
	{
		return -1;
	}
}

function calcRight (x, y) {
	var xx = parseInt(x);
	var yy = parseInt(y);
	if (xx < 300)
	{
		for (var i =0; i<div.length; i++){
			if (parseInt(div[i].style.left) - 100 == xx && parseInt(div[i].style.top) == yy) 
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	} 
}

function calcUp (x, y) {
	var xx = parseInt(x);
	var yy = parseInt(y);
	if (yy > 0)
	{
		for (var i=0; i<div.length; i++)
		{
			if (parseInt(div[i].style.top) + 100 == yy && parseInt(div[i].style.left) == xx) 
			{
				return i;
			}
		} 
	}
	else 
	{
		return -1;
	}
}

function calcDown (x, y)
{
	var xx = parseInt(x);
	var yy = parseInt(y);
	if (yy < 300)
	{
		for (var i=0; i<div.length; i++)
		{
			if (parseInt(div[i].style.top) - 100 == yy && parseInt(div[i].style.left) == xx) 
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	} 
}

function swap (pos) {
	var temp = div[pos].style.top;
	div[pos].style.top = blankSpacesUp;
	blankSpacesUp = temp;

	temp = div[pos].style.left;
	div[pos].style.left = blankSpacesDown;
	blankSpacesDown = temp;
}