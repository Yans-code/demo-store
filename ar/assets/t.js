import style from './t.css'

var img = new Image()
img.src = avatar
img.classList.add(style['avatar-sass'])

var root = document.getElementById('root')
root.appendChild(img)
