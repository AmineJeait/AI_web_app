import pygame
import sys

# Initialize the pygame library
pygame.init()

# Set the screen dimensions
SCREEN_WIDTH = 400
SCREEN_HEIGHT = 400

# Create the game window
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))

# Set the title of the game window
pygame.display.set_caption("Pac-Man")

# Define the colors used in the game
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
RED = (255, 0, 0)
PINK = (255, 192, 203)

# Define the maze
maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

# Define the Pac-Man character
pac_man = {
    "x": 1,
    "y": 1,
    "direction": "right",
}

# Define the ghost characters
ghosts = [
    {"x": 7, "y": 1, "direction": "left"},
    {"x": 8, "y": 1, "direction": "right"},
    {"x": 9, "y": 1, "direction": "up"},
    {"x": 10, "y": 1, "direction": "down"},
]

# Define the score
score = 0

# Game loop
running = True
while running:

    # Handle events
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                pac_man["direction"] = "left"
            elif event.key == pygame.K_RIGHT:
                pac_man["direction"] = "right"
            elif event.key == pygame.K_UP:
                pac_man["direction"] = "up"
            elif event.key == pygame.K_DOWN:
                pac_man["direction"] = "down"

    # Move Pac-Man
    if pac_man["direction"] == "left":
        pac_man["x"] -= 1
    elif pac_man["direction"] == "right":
        pac_man["x"] += 1
    elif pac_man["direction"] == "up":
        pac_man["y"] -= 1
    elif pac_man["direction"] == "down":
        pac_man["y"] += 1

    # Move the ghosts
    for ghost in ghosts:
        if ghost["direction"] == "left":
            ghost["x"] -= 1
        elif ghost["direction"] == "right":
            ghost["x"] += 1
        elif ghost["direction"] == "up":
            ghost["y"] -= 1
        elif ghost["direction"] == "down":
            ghost["y"] += 1

    # Check for collisions with walls
    if maze[pac_man["y"]][pac_man["x"]] == 1:
        pac_man["x"] -= 1

    # Check for collisions with ghosts
    for ghost in ghosts:
        if pac_man["x"] == ghost["x"] and pac_man["y"] == ghost["y"]:
            running = False

    # Check for collisions with dots
    if maze[pac_man["y"]][pac_man["x"]] == 0:
        maze[pac_man["y"]][pac_man["x"]] = 2
        score += 10

    # Draw the screen
    screen.fill(BLACK)

    # Draw the maze
    for y in range(len(maze)):
        for x in range(len(maze[0])):
            if maze[y][x] == 1:
                pygame.draw.rect(screen, WHITE, (x * 20, y * 20, 20, 20))
            elif maze[y][x] == 0:
                pygame.draw.rect(screen, RED, (x * 20, y * 20, 20, 20))
            elif maze[y][x] == 2:
                pygame.draw.rect(screen, PINK, (x * 20, y * 20, 20, 20))

    # Draw Pac-Man
    pygame.draw.circle(screen, WHITE, (pac_man["x"] * 20 + 10, pac_man["y"] * 20 + 10), 5)

    # Draw the ghosts
    for ghost in ghosts:
        pygame.draw.circle(screen, WHITE, (ghost["x"] * 20 + 10, ghost["y"] * 20 + 10), 5)

    # Draw the score
    font = pygame.font.SysFont("arial", 20)
    text = font.render("Score: " + str(score), True, WHITE)
    screen.blit(text, (10, 10))

    # Update the display
    pygame.display.update()

# Quit the game
pygame.quit()