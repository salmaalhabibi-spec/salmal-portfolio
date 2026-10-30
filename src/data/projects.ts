import colourways from "@/assets/projects/djed/colourways.jpg";
import more from "@/assets/projects/djed/more.jpg";
import applications from "@/assets/projects/djed/applications.jpg";
import materials from "@/assets/projects/djed/materials.jpg";
import prototype from "@/assets/projects/djed/prototype.jpg";
import mechanism from "@/assets/projects/djed/mechanism.jpg";
import technical from "@/assets/projects/djed/technical.jpg";
import functionsBoard from "@/assets/projects/djed/functions.jpg";
import userBoard from "@/assets/projects/djed/user.jpg";
import adapt from "@/assets/projects/djed/adapt.jpg";
import systemBoard from "@/assets/projects/djed/system.jpg";
import formBoard from "@/assets/projects/djed/form.jpg";
import heritage from "@/assets/projects/djed/heritage.jpg";
import djedCover from "@/assets/projects/djed/cover.jpg";
import mainDining from "@/assets/projects/my-broast/main-dining.jpg";
import moodBoard from "@/assets/projects/my-broast/mood-board.jpg";
import materialBoard from "@/assets/projects/my-broast/material-board.jpg";
import dimensionPlan from "@/assets/projects/my-broast/dimension-plan.jpg";
import furniturePlan from "@/assets/projects/my-broast/furniture-plan.jpg";
import diningSunlit from "@/assets/projects/my-broast/dining-sunlit.jpg";
import diningBooth from "@/assets/projects/my-broast/dining-booth.jpg";
import diningCorner from "@/assets/projects/my-broast/dining-corner.jpg";
import diningScreen from "@/assets/projects/my-broast/dining-screen.jpg";
import diningWindows from "@/assets/projects/my-broast/dining-windows.jpg";
import diningLogo from "@/assets/projects/my-broast/dining-logo.jpg";
import broastCover from "@/assets/projects/my-broast/cover.jpg";
import detailChair from "@/assets/projects/my-broast/detail-chair.jpg";
import detailLight from "@/assets/projects/my-broast/detail-light.jpg";
import detailBooth from "@/assets/projects/my-broast/detail-booth.jpg";
import entranceFeature from "@/assets/projects/my-broast/entrance-feature.jpg";
import entranceMirror from "@/assets/projects/my-broast/entrance-mirror.jpg";
import entranceHall from "@/assets/projects/my-broast/entrance-hall.jpg";
import facadeDusk from "@/assets/projects/my-broast/facade-dusk.jpg";
import facadeNight from "@/assets/projects/my-broast/facade-night.jpg";
import logo from "@/assets/projects/my-broast/logo.jpg";
import oliveCover from "@/assets/projects/between-olive-walnut/cover.jpg";
import oliveColour from "@/assets/projects/between-olive-walnut/colour-palette.jpg";
import oliveMaterial from "@/assets/projects/between-olive-walnut/material-board.jpg";
import oliveOpt1 from "@/assets/projects/between-olive-walnut/plan-opt-1.jpg";
import oliveOpt2 from "@/assets/projects/between-olive-walnut/plan-opt-2.jpg";
import oliveOpt3 from "@/assets/projects/between-olive-walnut/plan-opt-3.jpg";
import oliveOpt4 from "@/assets/projects/between-olive-walnut/plan-opt-4.jpg";
import olivePlanFinal from "@/assets/projects/between-olive-walnut/plan-final.jpg";
import oliveAerial from "@/assets/projects/between-olive-walnut/aerial.jpg";
import oliveLiving from "@/assets/projects/between-olive-walnut/living-main.jpg";
import oliveChairs from "@/assets/projects/between-olive-walnut/living-chairs.jpg";
import oliveLounge from "@/assets/projects/between-olive-walnut/living-lounge.jpg";
import oliveTv from "@/assets/projects/between-olive-walnut/living-tv.jpg";
import oliveMirror from "@/assets/projects/between-olive-walnut/living-mirror.jpg";
import oliveWindow from "@/assets/projects/between-olive-walnut/living-window.jpg";
import oliveHallSeating from "@/assets/projects/between-olive-walnut/hall-seating.jpg";
import oliveLivingHall from "@/assets/projects/between-olive-walnut/living-hall.jpg";
import oliveHallDoors from "@/assets/projects/between-olive-walnut/hall-doors.jpg";
import olivePanorama from "@/assets/projects/between-olive-walnut/living-panorama.jpg";
import oliveDiningWindow from "@/assets/projects/between-olive-walnut/dining-window.jpg";
import oliveDiningConsole from "@/assets/projects/between-olive-walnut/dining-console.jpg";
import oliveDiningMirror from "@/assets/projects/between-olive-walnut/dining-mirror.jpg";
import oliveOrthoSofa from "@/assets/projects/between-olive-walnut/ortho-sofa.jpg";
import oliveOrthoChair from "@/assets/projects/between-olive-walnut/ortho-chair.jpg";
import oliveOrthoTable from "@/assets/projects/between-olive-walnut/ortho-table.jpg";
import curvesCover from "@/assets/projects/soft-curves/cover.jpg";
import curvesBedroom from "@/assets/projects/soft-curves/bedroom.jpg";
import curvesWindow from "@/assets/projects/soft-curves/window-corner.jpg";
import curvesBedAngle from "@/assets/projects/soft-curves/bed-angle.jpg";
import curvesArmchair from "@/assets/projects/soft-curves/armchair.jpg";
import curvesTv from "@/assets/projects/soft-curves/tv-wall.jpg";
import curvesLoungeView from "@/assets/projects/soft-curves/lounge-view.jpg";
import curvesLoungeChairs from "@/assets/projects/soft-curves/lounge-chairs.jpg";
import curvesLoungeAngle from "@/assets/projects/soft-curves/lounge-angle.jpg";
import curvesSuite from "@/assets/projects/soft-curves/suite.jpg";
import curvesVanity from "@/assets/projects/soft-curves/vanity.jpg";
import curvesVanityWindow from "@/assets/projects/soft-curves/vanity-window.jpg";
import curvesVanityEntry from "@/assets/projects/soft-curves/vanity-entry.jpg";
import curvesWardrobeCurve from "@/assets/projects/soft-curves/wardrobe-curve.jpg";
import curvesWardrobeArch from "@/assets/projects/soft-curves/wardrobe-arch.jpg";
import curvesWardrobeOpen from "@/assets/projects/soft-curves/wardrobe-open.jpg";

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type GalleryGroup = {
  id: string;
  /** Small label above the images. Omit for an unlabeled continuation row. */
  label?: string;
  /** row = equal-height images; full = one wide image; portrait = one centered image */
  layout: "row" | "full" | "portrait";
  images: ProjectImage[];
};

export type ProjectBlock =
  | { kind: "prose"; title: string; body: string }
  | { kind: "list"; title: string; items: { label: string; text: string }[] }
  | { kind: "line"; title: string; text: string };

export type Sector = "residential" | "commercial" | "product";

export type Project = {
  slug: string;
  /** Homepage card title */
  title: string;
  /** Homepage shows every project. residential and commercial pages filter on this. */
  sector: Sector;
  category: string;
  year: string;
  cover: ProjectImage;
  /** Project page headline. Falls back to title. */
  headline?: string;
  question?: string;
  overview?: string;
  meta?: string[];
  blocks?: ProjectBlock[];
  gallery: GalleryGroup[];
};

const img = (
  src: string,
  width: number,
  height: number,
  alt: string,
): ProjectImage => ({ src, width, height, alt });

/**
 * PROJECTS — this is the only file for project text and images.
 *
 * Each project is one block in the list below. The site layout does not change
 * when you add or remove a block. Projects appear in this order.
 *
 * Images for a project live in one folder:
 *   src/assets/projects/<folder-name>/
 * Name the card picture cover.jpg. Other pictures can be named however you like.
 * Then add one import at the top of this file and use it in that project's cover
 * and gallery. See README.md for the copy-paste steps.
 *
 * sector:
 *   "residential" — also shown on the Residential page
 *   "commercial"  — also shown on the Commercial page
 * The homepage shows every project.
 */
export const projects: Project[] = [
  {
    slug: "between-olive-walnut",
    title: "Between Olive & Walnut — Contemporary Reception",
    sector: "residential",
    category: "Interior Design",
    year: "2026",
    cover: img(
      oliveCover,
      1430,
      1100,
      "Contemporary reception with an olive sofa, walnut chairs, and a marble coffee table",
    ),
    headline: "Between Olive & Walnut — Contemporary Reception",
    overview:
      "The reception area uses a Contemporary Organic Modern style featuring natural light, rich woods, soft shapes, and earthy tones to create a welcoming, elegant, and functional space.",
    meta: ["Year 2026", "Freelance project | Area: 55 m² | Location: New Cairo"],
    blocks: [
      {
        kind: "prose",
        title: "Client Brief & Design Objective",
        body: "Maximize the reception's functional capacity with a cohesive, interconnected layout that balances seating, circulation, and visual openness, creating a welcoming space without feeling crowded.",
      },
    ],
    gallery: [
      {
        id: "boards",
        label: "Mood board & Material board for the reception.",
        layout: "row",
        images: [
          img(oliveColour, 1536, 1024, "Colour palette for the reception: ivory, linen, sand, taupe, mushroom, olive, walnut, and espresso"),
          img(oliveMaterial, 1312, 1199, "Material board with stone, walnut, olive fabric, marble, leather, and boucle"),
        ],
      },
      {
        id: "options",
        label: "Plan options proposed to the client for selection.",
        layout: "row",
        images: [
          img(oliveOpt1, 924, 847, "Furniture layout option 1 for the reception and dining area"),
          img(oliveOpt2, 915, 847, "Furniture layout option 2 for the reception and dining area"),
          img(oliveOpt3, 898, 850, "Furniture layout option 3 for the reception and dining area"),
          img(oliveOpt4, 881, 850, "Furniture layout option 4 for the reception and dining area"),
        ],
      },
      {
        id: "final-plan",
        label: "OPT. 4 | Final Plan Selection",
        layout: "row",
        images: [
          img(olivePlanFinal, 1306, 1205, "Final furniture plan, option 4, with circulation dimensions"),
          img(oliveAerial, 1254, 1254, "Aerial view of the finished reception, dining area, and hallway"),
        ],
      },
      {
        id: "living",
        label: "Living Area",
        layout: "full",
        images: [
          img(oliveLiving, 1430, 1100, "Living area with olive and beige seating, a marble coffee table, and an arched window"),
        ],
      },
      {
        id: "living-pair",
        layout: "row",
        images: [
          img(oliveChairs, 1430, 1100, "Olive sofa and two walnut-based lounge chairs around a marble coffee table"),
          img(oliveLounge, 1254, 1254, "Lounge grouping with a dome pendant, barrel chairs, and an olive ottoman"),
        ],
      },
      {
        id: "living-trio",
        layout: "row",
        images: [
          img(oliveTv, 1254, 1254, "Media wall in walnut, with the dining area beyond"),
          img(oliveMirror, 1430, 1100, "Sideboard under a circular mirror, with the lounge in the foreground"),
          img(oliveWindow, 1254, 1254, "Window seating beside the walnut media wall"),
        ],
      },
      {
        id: "halls",
        layout: "row",
        images: [
          img(oliveHallSeating, 1122, 1402, "Hallway with a wood-slat wall and lounge chairs in the foreground"),
          img(oliveLivingHall, 1683, 934, "Lounge opening onto the wood-slat hallway"),
          img(oliveHallDoors, 1122, 1402, "Corridor of walnut doors beside a fluted wall and an olive sofa"),
        ],
      },
      {
        id: "panorama",
        layout: "full",
        images: [
          img(olivePanorama, 2061, 763, "Wide view of both living zones, with the abstract artwork centered between them"),
        ],
      },
      {
        id: "dining",
        label: "Dining Area",
        layout: "row",
        images: [
          img(oliveDiningWindow, 1254, 1254, "Dining area facing the arched windows and a hammered-brass pendant"),
          img(oliveDiningConsole, 1254, 1254, "Dining sideboard beneath concentric brass mirrors"),
          img(oliveDiningMirror, 1254, 1254, "Dining table set in front of the circular mirror"),
        ],
      },
      {
        id: "ortho",
        label: "Orthographic Shots",
        layout: "row",
        images: [
          img(oliveOrthoSofa, 1254, 1254, "Overhead view of the olive sofa, cushions, and throw"),
          img(oliveOrthoChair, 1254, 1254, "Close view of the olive lounge chair and a barrel chair"),
          img(oliveOrthoTable, 1254, 1254, "Overhead view of two lounge chairs and the marble coffee table"),
        ],
      },
    ],
  },
  {
    slug: "soft-curves",
    title: "Soft Curves — Contemporary Master Bedroom",
    sector: "residential",
    category: "Interior Design",
    year: "2026",
    cover: img(
      curvesCover,
      1024,
      1024,
      "Bedside corner with a fluted headboard, botanical niche, and a glass pendant",
    ),
    headline: "Soft Curves — Contemporary Master Bedroom",
    overview:
      "A contemporary master bedroom shaped by soft curves, warm neutrals, and natural textures. Arched details, layered lighting, and rich wood accents create a calm and inviting retreat, balancing comfort with a refined, timeless character.",
    meta: ["Year 2026", "Assigned by MA20 Designs | Location: 5th Settlement"],
    gallery: [
      {
        id: "bedside",
        layout: "full",
        images: [
          img(
            curvesCover,
            1024,
            1024,
            "Bedside corner with a fluted headboard, botanical niche, and a glass pendant",
          ),
        ],
      },
      {
        id: "bedroom",
        layout: "full",
        images: [
          img(
            curvesBedroom,
            1536,
            1024,
            "Master bedroom with twin arched niches, layered bedding, and a lounge chair by the window",
          ),
        ],
      },
      {
        id: "window-corner",
        layout: "full",
        images: [
          img(
            curvesWindow,
            1024,
            1024,
            "Window corner with sheer curtains, a lounge chair, a side table, and an arched niche",
          ),
        ],
      },
      {
        id: "bed-angle",
        layout: "full",
        images: [
          img(
            curvesBedAngle,
            1024,
            1024,
            "Angled view of the bed, both arched niches, and the dressing area beyond",
          ),
        ],
      },
      {
        id: "armchair",
        layout: "full",
        images: [
          img(
            curvesArmchair,
            1024,
            1024,
            "Upholstered armchair beside a round side table and a potted tree",
          ),
        ],
      },
      {
        id: "tv-wall",
        layout: "full",
        images: [
          img(
            curvesTv,
            1536,
            1024,
            "Television set into a window wall, with a roman blind and a curved console",
          ),
        ],
      },
      {
        id: "lounge-view",
        layout: "full",
        images: [
          img(
            curvesLoungeView,
            1024,
            1024,
            "View from the bed toward the lounge chairs and sheer curtains at the balcony",
          ),
        ],
      },
      {
        id: "lounge-chairs",
        layout: "full",
        images: [
          img(
            curvesLoungeChairs,
            1536,
            1024,
            "Two boucle lounge chairs facing the window, with a small table between them",
          ),
        ],
      },
      {
        id: "lounge-angle",
        layout: "full",
        images: [
          img(
            curvesLoungeAngle,
            1024,
            1024,
            "Lounge chairs angled toward the window and the trees beyond",
          ),
        ],
      },
      {
        id: "suite",
        layout: "full",
        images: [
          img(
            curvesSuite,
            1536,
            1024,
            "Wide view of the suite, from the lounge chairs to the bed and the vanity",
          ),
        ],
      },
      {
        id: "vanity",
        layout: "full",
        images: [
          img(
            curvesVanity,
            1024,
            1024,
            "Dressing table with an arched mirror, open shelves, and a boucle stool",
          ),
        ],
      },
      {
        id: "vanity-window",
        layout: "full",
        images: [
          img(
            curvesVanityWindow,
            1024,
            1024,
            "Vanity facing an arched mirror that reflects the garden window",
          ),
        ],
      },
      {
        id: "vanity-entry",
        layout: "full",
        images: [
          img(
            curvesVanityEntry,
            1024,
            1024,
            "Dressing area opening back toward the bed through a plaster arch",
          ),
        ],
      },
      {
        id: "wardrobes",
        layout: "row",
        images: [
          img(
            curvesWardrobeCurve,
            1024,
            1024,
            "Curved fluted-wood wardrobes facing each other in the dressing room",
          ),
          img(
            curvesWardrobeArch,
            1024,
            1024,
            "Backlit archway into the dark wood dressing room",
          ),
          img(
            curvesWardrobeOpen,
            1024,
            1024,
            "Open fluted wardrobe with drawers, hanging space, and mirrored doors",
          ),
        ],
      },
    ],
  },
  {
    slug: "djed",
    title: "DJED Modular Seating System",
    sector: "commercial",
    category: "Product Design",
    year: "2025",
    cover: img(
      djedCover,
      2000,
      1414,
      "DJED modular seating system, a beige sofa and two chairs with integrated reading lights",
    ),
    headline: "DJED Modular Seating System",
    overview: "MAHALLY\u00A0\u00A0Product\u00A0\u00A0Design Award 2nd Place Winners.",
    meta: ["Year 2025", "Group project"],
    gallery: [
      {
        id: "cover",
        layout: "full",
        images: [
          img(
            djedCover,
            2000,
            1414,
            "DJED modular seating system, a beige sofa and two chairs with integrated reading lights",
          ),
        ],
      },
      {
        id: "heritage",
        layout: "full",
        images: [
          img(
            heritage,
            2000,
            1414,
            "From heritage to contemporary seating, comparing the Ankh, Djed pillar and Was sceptre with their abstracted forms",
          ),
        ],
      },
      {
        id: "form",
        layout: "full",
        images: [
          img(
            formBoard,
            2000,
            1414,
            "From form to furniture, sketches translating the Ankh, Was sceptre and Djed pillar into the seating",
          ),
        ],
      },
      {
        id: "system",
        layout: "full",
        images: [
          img(
            systemBoard,
            2000,
            1414,
            "The modular system, five core pieces with dimensions, configurations and integrated add-ons",
          ),
        ],
      },
      {
        id: "adapt",
        layout: "full",
        images: [
          img(
            adapt,
            2000,
            1414,
            "Designed to adapt, four settings for private focus, collaboration, lounge and social gathering",
          ),
        ],
      },
      {
        id: "user",
        layout: "full",
        images: [
          img(
            userBoard,
            2000,
            1414,
            "Designed around the user, five steps from sitting and adjusting to dividing, supporting and working",
          ),
        ],
      },
      {
        id: "functions",
        layout: "full",
        images: [
          img(
            functionsBoard,
            2000,
            1414,
            "Integrated functions: a movable partition, adjustable lighting, concealed power and a rotating side table",
          ),
        ],
      },
      {
        id: "technical",
        layout: "full",
        images: [
          img(
            technical,
            2000,
            1414,
            "Dimensional studies and technical drawings of the sofa, closed chair and open chair",
          ),
        ],
      },
      {
        id: "mechanism",
        layout: "full",
        images: [
          img(
            mechanism,
            2000,
            1414,
            "Mechanism and engineering studies for the partition, gas strut, side table and sofa frame",
          ),
        ],
      },
      {
        id: "prototype",
        layout: "full",
        images: [
          img(
            prototype,
            2000,
            1414,
            "Physical prototype of the DJED sofa and chair in grey upholstery and walnut",
          ),
        ],
      },
      {
        id: "materials",
        layout: "full",
        images: [
          img(
            materials,
            2000,
            1414,
            "Material palette and detailing, with prototype close-ups and five proposed colourways",
          ),
        ],
      },
      {
        id: "applications",
        layout: "full",
        images: [
          img(
            applications,
            2000,
            1414,
            "Market potential across residential interiors, hospitality, lounges and shared spaces",
          ),
        ],
      },
      {
        id: "more",
        layout: "full",
        images: [
          img(
            more,
            2000,
            1414,
            "More than a seat, a rust and cream modular arrangement with privacy and material details",
          ),
        ],
      },
      {
        id: "colourways",
        layout: "full",
        images: [
          img(
            colourways,
            2000,
            1414,
            "Five colourways of the DJED chair, terracotta, blue-grey, green, blue and brown",
          ),
        ],
      },
    ],
  },
  {
    slug: "my-broast",
    title: "My Broast Restaurant",
    sector: "commercial",
    category: "Interior Design & 3D Visualisation",
    year: "2026",
    cover: img(
      broastCover,
      1254,
      1254,
      "Dining tables in front of the illuminated My Broast logo wall, with street trees beyond the windows",
    ),
    headline: "My Broast Fried Chicken Restaurant",
    question: "Can a restaurant's interior become part of its identity?",
    overview:
      "MY BROAST explores this idea through bold forms, warm materials, sculptural lighting, and a distinctive visual language.",
    meta: ["Year 2026", "Assigned by MA20 Designs | Area: 85 m²"],
    blocks: [
      {
        kind: "prose",
        title: "Client Brief",
        body: "The client wanted a distinctive dining environment that strongly reflects the restaurant’s brand identity while maximising seating capacity without compromising customer comfort.",
      },
      {
        kind: "list",
        title: "Design Objectives",
        items: [
          {
            label: "Brand Integration",
            text: "Reinforce brand identity through cohesive interior elements, finishes, and visual features.",
          },
          {
            label: "Space Optimisation",
            text: "Maximise table capacity while maintaining comfortable circulation and functionality.",
          },
          {
            label: "Customer Engagement",
            text: "Create a distinctive, photo-friendly destination that encourages interaction and increases brand visibility.",
          },
        ],
      },
      {
        kind: "line",
        title: "Design Focus",
        text: "Spatial Planning · Brand Integration · Materiality · Furniture Layout · Lighting Design · Customer Experience",
      },
      {
        kind: "line",
        title: "Project Scope",
        text: "Interior Design & 3D Visualisation · Dining Areas · Entrance Design · Facade Design",
      },
    ],
    gallery: [
      {
        id: "mood",
        label: "Mood Board & Material Board",
        layout: "row",
        images: [
          img(moodBoard, 1536, 1024, "Mood board for My Broast, with brand photography, a sketch, warm lighting, and the colour palette"),
          img(materialBoard, 1536, 1024, "Material board showing wood slats, terrazzo, textured paint, metal screen, leather, fabric, and the colour palette"),
        ],
      },
      {
        id: "plans",
        label: "Dimension Plan & Furniture Plan",
        layout: "row",
        images: [
          img(dimensionPlan, 1390, 1132, "Dimension plan of the My Broast floor with red measurement lines"),
          img(furniturePlan, 1390, 1132, "Furniture plan of the My Broast floor showing tables, booths, and the stair"),
        ],
      },
      {
        id: "lounge",
        label: "Main dining lounge",
        layout: "full",
        images: [
          img(mainDining, 1672, 941, "Main dining lounge with the illuminated My Broast sign, sculptural pendant light, and leather seating"),
        ],
      },
      {
        id: "dining-a",
        layout: "row",
        images: [
          img(diningSunlit, 1131, 1391, "Sunlit dining floor with terracotta panels and the wavy ceiling light"),
          img(diningBooth, 1254, 1254, "Leather booth and table set in front of the My Broast sign"),
          img(diningCorner, 1132, 1389, "Corner dining tables beside the street-facing windows"),
        ],
      },
      {
        id: "dining-b",
        layout: "row",
        images: [
          img(diningScreen, 1305, 1205, "Dining tables facing a wall-mounted screen under the wavy light"),
          img(diningWindows, 1665, 944, "Daylit dining floor along the curved street-facing windows"),
          img(diningLogo, 1374, 1145, "Booth seating beside the illuminated My Broast logo wall"),
        ],
      },
      {
        id: "details",
        label: "Material Details",
        layout: "row",
        images: [
          img(detailChair, 653, 1205, "Close-up of a leather dining chair, stone tabletop, and menu card"),
          img(detailLight, 800, 999, "The wavy LED light seen from below, against the terracotta wall and lattice ceiling"),
          img(detailBooth, 1230, 1278, "Close-up of the caramel leather booth and a woven cushion"),
        ],
      },
      {
        id: "entrance",
        label: "Entrance & Hallway",
        layout: "row",
        images: [
          img(entranceFeature, 1431, 1099, "Entrance feature wall with the line Better Food Better Mood"),
          img(entranceMirror, 1121, 1403, "Hallway with a wavy illuminated mirror, plants, and warm linear lighting"),
          img(entranceHall, 1121, 1403, "Hallway looking toward the glazed entrance and stair"),
        ],
      },
      {
        id: "facade",
        label: "Facade",
        layout: "row",
        images: [
          img(facadeDusk, 1178, 1335, "Golden-hour street view of the curved red My Broast storefront"),
          img(facadeNight, 1178, 1335, "Evening view of the My Broast facade with a wet street and illuminated stairs"),
        ],
      },
      {
        id: "logo",
        label: "Logo Design and branding colours",
        layout: "portrait",
        images: [
          img(logo, 1145, 1374, "Close-up of the illuminated My Broast logo and branding colours"),
        ],
      },
    ],
  },
];


export function projectsBySector(sector: Sector): Project[] {
  return projects.filter((project) => project.sector === sector);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
