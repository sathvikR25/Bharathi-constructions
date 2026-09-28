from PIL import Image
img = Image.open('public/logo.png')
print('Mode:', img.mode)
print('Size:', img.size)