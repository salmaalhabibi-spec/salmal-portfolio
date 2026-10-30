# Salma Ibrahim Alhabibi Portfolio

Do not publish yet. Edit the files below, then check the live preview. Publishing is a separate step for when you are ready.

You do not need to change the page layout. New work uses the same cards, project pages, and galleries as the projects already on the site.

## Where things live

| What you want to change | Open this file |
|---|---|
| Projects (titles, years, descriptions, categories, covers, galleries, alt text) | [src/data/projects.ts](src/data/projects.ts) |
| Project pictures | `src/assets/projects/<folder-name>/` |
| Behance, LinkedIn, Instagram, email, WhatsApp, and the contact email | [src/data/site.ts](src/data/site.ts) |
| About page | [src/data/about.ts](src/data/about.ts) |
| About portrait | `src/assets/about/portrait.jpg` |
| Résumé (opened from About) | [src/data/resume.ts](src/data/resume.ts) |

Every project uses the same folder shape:

```text
src/assets/projects/my-project-name/
  cover.jpg          the picture on the homepage card
  any-other-name.jpg more pictures for the project page
```

`my-project-name` is the folder name. Use short lowercase words with hyphens, such as `soft-curves`. That same name is the project address: `/projects/soft-curves`.

The homepage lists every project, in the same order as the list in `projects.ts`. A project marked residential also appears on Residential. A project marked commercial also appears on Commercial.

## 1. Add a new project

1. Create a folder: `src/assets/projects/my-project-name/`.
2. Put the card picture in that folder and name it `cover.jpg`. Add any other pictures in the same folder.
3. Open [src/data/projects.ts](src/data/projects.ts). At the top, with the other `import` lines, add one line per picture:

```ts
import myCover from "@/assets/projects/my-project-name/cover.jpg";
```

4. Copy this block and paste it at the top of the `projects` list (after `export const projects`). Put a comma after the closing `},` if the next project does not already have one.

```ts
{
  slug: "my-project-name",
  title: "Project title shown on the card",
  sector: "residential",
  category: "Interior Design",
  year: "2026",
  cover: img(myCover, 1600, 1200, "Short description of the cover picture"),
  headline: "Project title shown on the card",
  overview: "One or two sentences about the project.",
  meta: ["Year 2026"],
  gallery: [
    {
      id: "cover",
      layout: "full",
      images: [
        img(myCover, 1600, 1200, "Short description of the cover picture"),
      ],
    },
  ],
},
```

5. Change the words in quotes to your own. `sector` is either `"residential"` or `"commercial"`.
6. Replace `1600` and `1200` with the picture’s width and height in pixels. On a Mac, select the file and press Command–I. On Windows, right-click the file, choose Properties, then Details.
7. The text in quotes after the numbers is the alt text. Describe what is in the picture in a few words.
8. To show more pictures, add an `import` for each file, then another item inside `images`, or another `{ id, layout, images }` group. Use `"full"` for one wide picture. Use `"row"` for several pictures side by side. Use `"portrait"` for one centered picture.

Save the file. The preview updates on its own. Do not add a project until it has a real cover picture.

## 2. Edit an existing project

1. Open [src/data/projects.ts](src/data/projects.ts).
2. Find the project by its title, for example `Between Olive & Walnut`.
3. Change the title, year, category, description (`overview`), or alt text in that block only.
4. Save. Leave the `slug` as it is unless you also want a new web address.

## 3. Remove a project

1. Open [src/data/projects.ts](src/data/projects.ts).
2. Delete that project’s whole `{ ... },` block from the list.
3. Delete the `import` lines at the top that belong only to that project.
4. You can also delete its folder under `src/assets/projects/`. The other projects stay as they are.

## 4. Replace images

1. Find the project folder, for example `src/assets/projects/my-broast/`.
2. To swap a picture and keep the same file name, replace the file. Then, in that project’s block in [src/data/projects.ts](src/data/projects.ts), update the width, height, and alt text if the new picture is a different size or shows something else.
3. To use a new file name, put the file in the same folder, add an `import` line, and point `cover` or the gallery line at the new name.
4. The About portrait is the exception: replace `src/assets/about/portrait.jpg` and keep that file name. Update its width, height, and alt text in [src/data/about.ts](src/data/about.ts).

## 5. Change social links

Open [src/data/site.ts](src/data/site.ts). Each link has an `href`. Replace the address inside the quotes. Keep `https://` at the start.

| Link | What to paste |
|---|---|
| Behance, LinkedIn, Instagram | The full profile address |
| Email | `mailto:you@email.com` |
| WhatsApp | A `https://wa.me/2015...` or `https://api.whatsapp.com/...` address |
| `contactEmail` | The same email address, without `mailto:` |

The icons stay the same. Only the addresses change.

## 6. Update the About and Contact pages

**About.** Open [src/data/about.ts](src/data/about.ts). Edit `summary` and the lines under `education`. The portrait steps are in section 4.

**Résumé.** The My Resume button opens a page whose text is in [src/data/resume.ts](src/data/resume.ts). Edit the words there. The PDF in `public/resume.pdf` is a spare file; the page itself does not read it.

**Contact.** Send message emails `contactEmail` in [src/data/site.ts](src/data/site.ts), including the mobile number when the visitor fills it in. Message on WhatsApp opens WhatsApp with that same message. The WhatsApp address is in the same file. The footer line is `tagline`.
