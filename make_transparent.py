from PIL import Image

def make_white_transparent(img_path, out_path, tolerance=240):
    img = Image.open(img_path).convert('RGBA')
    data = img.getdata()
    
    new_data = []
    for item in data:
        # If the pixel is mostly white (r, g, b > tolerance)
        if item[0] >= tolerance and item[1] >= tolerance and item[2] >= tolerance:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(out_path, 'PNG')
    print('Converted logo to transparent!')

make_white_transparent('public/logo.png', 'public/logo.png', tolerance=230)