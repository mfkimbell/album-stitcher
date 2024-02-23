from .ImageGrab import *
from PIL import Image
import requests
from io import BytesIO
import math
import base64
from io import BytesIO
from fastapi.responses import JSONResponse


def download_image(url):
    return Image.open(BytesIO(requests.get(url).content))


def calculate_grid_size(num_images, target_width, target_height):
    # Find the grid size that minimally covers the area of the target dimensions
    area_per_image = target_width * target_height / num_images
    side_length = int(math.sqrt(area_per_image))

    # grid_layouts = {
    #     6: (2, 3),
    #     12: (3, 4),
    #     18: (3, 6),
    #     24: (4, 6),
    #     30: (5, 6),
    #     36: (6, 6),
    #     42: (6, 7),
    # }

    # # Get the rows and columns from the predefined layouts
    # cols, rows = grid_layouts.get(num_images, (1, num_images))

    # # Calculate the new width and height of each image
    # new_width = target_width // cols
    # new_height = target_height // rows

    # return cols, rows, new_width, new_height

    #Calculate how many images fit horizontally and vertically
    cols = max(1, target_width // side_length)
    rows = math.ceil(num_images / cols)

    # Adjust the size of each image based on the grid
    new_width = target_width // cols
    new_height = (
        target_height // rows
        if rows * cols >= num_images
        else target_height // (rows - 1)
    )

    return cols, rows, new_width, new_height

def stitch_images(image_urls, target_width, target_height):
    images = [download_image(url) for url in image_urls]
    num_images = len(images)

    if num_images == 0:
        raise ValueError("No images to stitch.")

    cols, rows, img_width, img_height = calculate_grid_size(
        num_images, target_width, target_height
    )

    combined_image = Image.new("RGB", (cols * img_width, rows * img_height))

    for index, image in enumerate(images):
        resized_image = image.resize((img_width, img_height), Image.ANTIALIAS)
        x_pos = (index % cols) * img_width
        y_pos = (index // cols) * img_height
        combined_image.paste(resized_image, (x_pos, y_pos))

    # Crop the final image to the target dimensions if necessary
    combined_image = combined_image.crop((0, 0, target_width, target_height))

    return combined_image


def execute(url, resolution):
    # image_urls = get_image_urls(
    #     "https://open.spotify.com/playlist/4Tt8IyX1wG0gaBa58azmCW?si=8c3b5c8abd8f42eb"
    # )
    image_urls = get_image_urls(url)
    # Ideal sizes: 21(3), 36(4), 55(5), 78(6), 112(7), 144(8), 180(9)

    #  75, 84, 90, 96, 105, 119, 126, 133,
    print("Playlist Size: ", len(image_urls))
    print("Loading...")

    # 78/6=13 112/7=16 144/8=18
    print(*resolution)
    combined_image = stitch_images(image_urls, *resolution)
    print("combine_image", combined_image)
    print("combine_image type", type(combined_image))

      # Convert PIL Image to Bytes
    # Convert PIL Image to Bytes
    img_byte_arr = BytesIO()
    combined_image.save(img_byte_arr, format='PNG')  # You can change 'PNG' to your desired format
    img_byte_arr = img_byte_arr.getvalue()

    # Encode image to Base64
    img_base64 = base64.b64encode(img_byte_arr).decode('utf-8')

    # Send Base64-encoded image in response
    return JSONResponse(content={"image": img_base64, "format": "png"})


    # combined_image.show()  # To display the image

    # combined_image.save("combined_image.jpg")  # saves the image
