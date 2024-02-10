# STL
import base64, math
import numpy as np
from PIL import Image, ImageDraw


def image_to_base64_string(image_path: str):
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode("utf-8")
    return encoded_string

def save_image_obj(image, save_path):
    image.save(save_path)