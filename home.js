var data = `
<div class="info">
	<h1>IC-hat</h1>
	<h2>The new chat 100% free.</h2>
	<h3>What to try it ? click on login or register to start testing</h3>
	<h4>Geoloup don't collect data. Ads are not a thing for us. Note: other service may collect data. To see the service we use please se : <a href='https://github.com/franck403/IC-hat?tab=readme-ov-file#readme' target="_blank" rel="noopener noreferrer">Ic-hat readme</a></h4>
</div>
<div id="mm" class="mm">
	<span class="cls" onclick="acpt()">Accept</span>
	<h2>Terms of service</h2>
	<p>Welcome to Ic-hat! These Terms of Service govern your use and outline the rights and responsibilities between you
		and us. By accessing or using the Application, you agree to be bound by these Terms. Please take note that the
		messages are filtred by an AI or a public API.
		IMPORTANT! Geoloup do not collect data. Ads are not a thing for us BUT please note that this is only for us not the other service we use.</p>
</div>
`

var ldata = data
document.getElementById("homedata").innerHTML = ldata

let image = { "light":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANGSURBVEiJndVPbNRVEAfwz9vd/q8tBQtoxSYYDKYmejMGD3DxYloMiRoT22IEDQcPno3xoFclMf6JHrDFyIVEI3g2eiDoRWOMfygqNrSkoeAWCtIu230e3m+77e6KCZO8vH3zZuY7M+/7mxVjVFu7C+vPt7mmh4fi+eEDMUYFVZkdeZU7dhgIzxOj25ULe3fJx6PYamZkDYD4rRDmmgafDIdE3aIJbcrKxkQF4/GtBtuY/43KGVBxOsT/S3YijAomEVBCBe0geNlYfLfBZ3bfJmFlp7u/ONUcYCIMCw6jL1vhFikUURS9Zn88Vn9ZaOJA8DTuA3n0Zjm3ZlDL2VrASpZE8CwaABormAgPC75Cny7cmYE0kwou4Rq4IWeP0fhdc4DjIe+GD0QvIKcbmzOrtl56t9O2gRBYvsKVcyz9ne7nsQgiPhUdtD8uNVYwGRbQK497qu3ZzsYHUuB1EimepTiVKplBGZQM6rI7liFX5/Ur0rPmpYw3ZcEL7fRso3eQQgcCfffT0Z+i9K3GOFMNvh7gWOjDYGpJpuvbkQK1dND/IF1b6Oynf4jW7jU2a3zY6uPQ3whw0/u4S5DYIqsAOjdrkKqutSfbVcncL+ejOoAQsC39VGN9yOiTa8LmXIGOx8h11RxqzzTgeHLOAGKUM4pFFdzMzJYX0n79YiPAP/O0PUSlHTE9cCXdCJ7zVFxZA4DReA4/gKVMd/WvtJcWKf6e6FlapPgHS0UW3uPyN9b58IuxOFU91Ne+E+kL7cb1Oa5O0zPI0kJaa+XaLIszif21q4x2if+1ClLP/iRrUfYNufQTF79P2ceY2lFaZP5HLqaCFaUxmOSsT3RWD42j4mh4RnQEnTZYP+pCLh1Se2uZF0FZdNC0o16Plf8GgMnwOZ5Eot9GiefVmbQiDbtitif52njcUx+q+TSNTgoZQAlzddblJj7ByWah0htc2LvL7L5Nq9r98YhBLSo2481Vfbkh+DtytljWaiy+3QwgxOnhIfl4AmdoGTXw2eUGq8lwWNCDD1WUBC+hYNyLTf9iZ554RAiPG/jyjYKcR7E1wa3sxKkGh/H4Sp3mULNsVyVvTgxTqYIYmRk5oOK0e0/8fEvH25B/AZyRWA6LDlu9AAAAAElFTkSuQmCC", "dark":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOfSURBVEiJlZVLaFxVGMd/333NJG2a+ujUJnGSSWljGvPoQ0tBbIooulDoQgSpEou4UOqiLlzpxoVFEIsgaotaaEhBEXVV8EUXgrao0SYxk6ROjCUxfaQvm8fMPfd+LqZJ5k4ySfxW93yP/+Ocw7mwTOhw21odbG8rzuf6N3fl+iqNDm5rXGreKlXwB1oe8vtr0yanF4JY1YeR2lDzbgnHn5JwxvYJjuhwR7wUjixUXBc3Wfsk/lg7sUYkvmXC1vB+qe3K5IZa90s2cxTNWQASa4B4C0AAfO8kOx8pxnMi4OdaEmbmcg9mIoF7NxLfAiIvSLIrAyChjswpsysg3jy7tEEuLeZgbotUsQL/SjdmIoF4SPl2QM7YNce/mO1xG85+p27dy3lp1XMbIPCrfbGsY0kCM7DxWzWXqgCINQIugh4TQSMuYRRAxSnM/Ss7jvglCfy+1gfwx/bMuhWv/lbR/rp4wLZw88qzPYIcBDIscpazkZdhXf2YMLy1DwnIq1Muxv5eMLCp5zPta6qQTb03oRdVDkO7XYpAdLhtrZkcuoKavIp4MxK7ByDrJDtLXr+VhmWy/oE5cECkfPYzpiNP37ZSIE23pLSvyVtAIGR3RTLizn0ay25ZEXjm3vVGL/wWxCrfU22PXH1LMVXR7lzhYu+y4H+1bjWTf45jV6/Bq38+OF/zTYTAEnUjAzozb0bp0H+eW7cUgdT93o274QxeDQChhK9GCELcy5GJILKsDHxzaFkX4qUJp99F5agrzrWIgFy68SPxM/vnMw6y5glg/uYJctBOHn9nOaLCyJ1/ZqeE4WrLldgHUTkGzY1EU+jb/si+t4oPsFSYkX3PWqqnLJGdAmD+SNzU4PqquQ6rDKl4LOIi70T7FN6wA/crSR2bKaypPmmbUfdBCezXEN0DqC1hgwAEg42Hwmwmcjji1UPZ9lIipxB+Ah1FLR90A3AfcGdBz5dOsnOv5Nmxgv7ENQ2uV0RgynYgXmolu1Ic03YQbJPUiXT+xyGEtnPXw1heGG37Bc2e+9/oAq9I6kQaCp5r2Xz2tHqpA4hb8DwrzHSjUz9COL0icEXftJOd7xeQRcMMNT1ObuxzDafcaMVGvFrw6sC6HWTB6DTwkpPs/KTIzSIqhrauM8GNTzHjuwsfwvkpB6w1IHEQVGV1r+vc8aJsPPXDgtaSXgEd2FXtc/V1gslHLabWa5jzEAXsACm/IVbZz8iqw05Dz8lSGP8BjRZeDZkbZsEAAAAASUVORK5CYII="}