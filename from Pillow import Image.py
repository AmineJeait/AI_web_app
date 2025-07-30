from PIL import Image, ImageDraw
import os

# Make sure resources folder exists
os.makedirs("resources", exist_ok=True)

# Create a 32x32 yellow circle on transparent background (Pac-Man style)
img = Image.new("RGBA", (32, 32), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)
draw.pieslice([0, 0, 32, 32], start=30, end=330, fill=(255, 255, 0))  # Pac-Man mouth open

img.save("resources/pacman_sprite.png")
print("✅ pacman_sprite.png created successfully.")


