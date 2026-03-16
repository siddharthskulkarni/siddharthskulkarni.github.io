## Aux notebooks

This folder contains auxiliary Python notebooks and scripts used to generate figures and run small experiments for essays in the main site.

- Notebooks are organized by essay under subfolders such as `time-series/`.
- Generated images are saved into the `public/images` folder so they can be referenced from markdown essays.

### Usage

1. Create the conda environment:

   ```bash
   conda env create -f aux/environment.yml
   ```

2. Activate the environment:

   ```bash
   conda activate essays-aux
   ```

3. Start Jupyter from the repo root or an `aux/<essay>/` subfolder:

   ```bash
   jupyter lab
   ```

