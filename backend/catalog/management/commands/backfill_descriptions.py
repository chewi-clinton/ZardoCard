import re

from django.core.management.base import BaseCommand

from catalog.models import Product

MIN_LENGTH = 500

AUTHENTICITY = (
    "Every item is 100% authentic and hand-inspected before it ships. "
)
SHIPPING = (
    "Orders ship within 24 hours with free, tracked shipping worldwide, and "
    "you'll receive a tracking number as soon as it's on its way. "
)
FINAL_SALE_SEALED = (
    "As with all sealed and graded collectibles, this item is final sale once shipped."
)
FINAL_SALE_RAW = (
    "As with all raw cards, the stated condition at time of sale is final, "
    "and this item is non-returnable once shipped."
)


def strip_tags(html):
    return re.sub(r"<[^>]*>", " ", html or "").strip()


def tcg_name(title, vendor, category_titles):
    text = f"{title} {vendor} {' '.join(category_titles)}".lower()
    if "one piece" in text:
        return "One Piece Card Game"
    return "Pokémon Trading Card Game"


def describe(product):
    title = product.title
    t = title.lower()
    vendor = product.vendor or "ZardoCards"
    category_titles = [c.title for c in product.categories.all()]
    tcg = tcg_name(title, vendor, category_titles)

    # Graded slabs (PSA/CGC/BGS) — check first since grading keywords can
    # appear alongside "deck"/"box"/etc. in the same title.
    if re.search(r"\b(psa|cgc|bgs)\b", t) or "graded" in t:
        grader = (
            "PSA" if "psa" in t else "CGC" if "cgc" in t else "BGS" if "bgs" in t else "a professional grading service"
        )
        return (
            f"{title} is a professionally graded and encapsulated {tcg} collectible, certified by "
            f"{grader} to guarantee its authenticity and condition grade. The card or deck is sealed "
            f"in a tamper-evident holder, protecting it from handling damage, moisture, and UV fading, "
            f"and making it ready for long-term display or storage. Independent grading verifies "
            f"centering, corners, edges, and surface quality, so you know exactly what condition you're "
            f"getting before you buy. {AUTHENTICITY}{SHIPPING}Graded collectibles are a popular choice "
            f"for serious collectors and investors who want assurance of authenticity and condition "
            f"without relying on raw, ungraded copies. {FINAL_SALE_SEALED}"
        )

    # Branded accessories/merch — checked early since titles like "Zardo
    # Booster Box Acrylic" or "Zardo Elite Trainer Box Acrylic" would
    # otherwise match the sealed-product patterns below (they're display
    # stands/accessories, not the actual sealed product they depict).
    if any(k in t for k in ["acrylic", "coin", "display case", "deck box", "pouch"]):
        return (
            f"{title} is an officially branded ZardoCards accessory, designed to help you store, "
            f"display, or protect your {tcg} collection. It's brand new and unused, shipped carefully "
            f"packaged to arrive in the same condition it left our facility, and makes a great add-on "
            f"for any collector organizing their cards or sealed product. {AUTHENTICITY}{SHIPPING}"
            f"This item is final sale once shipped."
        )

    if "sticker" in t:
        return (
            f"{title} is an authentic, officially licensed {tcg} sticker sheet, sold exactly as "
            f"originally packaged and untouched. It's a fun, low-cost collectible for display or "
            f"scrapbooking, and a nostalgic pickup for longtime fans. {AUTHENTICITY}{SHIPPING}"
            f"{FINAL_SALE_SEALED}"
        )

    # Checked before the standalone "figure" template below — a "Sealed Case
    # ... Figure Collection Box" is a bulk case, not a single collectible
    # figure, so let the case template further down handle it instead.
    if "figure" in t and "case" not in t:
        return (
            f"{title} is an authentic, officially licensed {tcg} collectible figure, sold new and "
            f"unopened in its original packaging. It's a great display piece for any collection and "
            f"makes a fun gift for fans of the franchise. {AUTHENTICITY}{SHIPPING}{FINAL_SALE_SEALED}"
        )

    if "master set" in t:
        return (
            f"{title} is a curated {tcg} card set assembled by ZardoCards, bringing together the cards "
            f"needed to complete this set or theme in one purchase instead of tracking down each card "
            f"individually. Every card in the set is hand-checked for authenticity and completeness "
            f"before it ships, so you can trust what you're getting matches what's advertised. "
            f"{AUTHENTICITY}{SHIPPING}This is a popular option for collectors who want to complete a "
            f"set quickly without hunting down singles one at a time. This item is final sale once "
            f"shipped."
        )

    if "elite trainer box" in t or re.search(r"\betb\b", t):
        return (
            f"{title} is a factory-sealed Elite Trainer Box from the {tcg}. Elite Trainer Boxes are a "
            f"premium sealed product format that bundles multiple booster packs together with player "
            f"accessories such as card sleeves, damage counters, condition markers, and a sturdy box "
            f"for organizing your collection. They're a popular pick for players who want a bigger pull "
            f"of packs in one purchase, as well as collectors who prefer to keep a set factory-sealed "
            f"for the long term. {AUTHENTICITY}{SHIPPING}{FINAL_SALE_SEALED}"
        )

    if "lenticular" in t or "poster" in t:
        return (
            f"{title} is an officially licensed {tcg} lenticular 3D poster, featuring a shifting, "
            f"multi-layered art effect that changes as you move past it, showcasing the artwork in a "
            f"way a flat print can't. It's a striking display piece for a game room, office, or collection "
            f"wall, and ships new and unopened in its original packaging. {AUTHENTICITY}{SHIPPING}This "
            f"item is sold as-is in factory packaging and is final sale once shipped."
        )

    if re.search(r"\bcase\b", t) and "acrylic" not in t and "deck box" not in t:
        return (
            f"{title} is a factory-sealed case from the {tcg}, containing multiple individually sealed "
            f"units inside. Buying a full case is ideal for resellers, local game stores, or dedicated "
            f"collectors looking to secure inventory in bulk before a set sells out, since these products "
            f"are printed in limited runs and tend to become harder to find shortly after release. We do "
            f"not open or repackage cases before shipping — they arrive exactly as received from the "
            f"manufacturer. {AUTHENTICITY}{SHIPPING}{FINAL_SALE_SEALED}"
        )

    if "booster bundle" in t or "build & battle" in t or "build and battle" in t:
        return (
            f"{title} is a factory-sealed multi-pack bundle from the {tcg}, giving you several booster "
            f"packs together in one sealed unit for a bigger pull than a single pack while costing less "
            f"per pack than buying individually. It's a popular option for players prepping for a "
            f"tournament or league event, as well as collectors who want more packs without committing "
            f"to a full booster box. {AUTHENTICITY}{SHIPPING}{FINAL_SALE_SEALED}"
        )

    if any(k in t for k in ["theme deck", "deck display", "deck promo", "starter set", "starter deck", "league battle deck", "demo deck"]):
        return (
            f"{title} is a factory-sealed, ready-to-play deck product from the {tcg}, ideal for players "
            f"who want a complete deck straight out of the box, or collectors looking to keep it sealed "
            f"as part of a set run. It arrives new and unopened in its original packaging. "
            f"{AUTHENTICITY}{SHIPPING}{FINAL_SALE_SEALED}"
        )

    if "booster box" in t:
        return (
            f"{title} is a factory-sealed booster box from the {tcg}, containing multiple individually "
            f"sealed booster packs. Booster boxes are the standard way collectors and players buy in "
            f"bulk, offering better value per pack than buying single packs while keeping every pack "
            f"factory-sealed until you're ready to open it. {AUTHENTICITY}{SHIPPING}{FINAL_SALE_SEALED}"
        )

    if "sleeved pack" in t:
        return (
            f"{title} is a factory-sealed sleeved booster pack from the {tcg} — a single booster pack "
            f"protected in an additional outer sleeve, exactly as originally packaged and untouched. "
            f"It's a great option for collectors who want to keep a pack sealed and pristine for display, "
            f"or players stocking up on singles. {AUTHENTICITY}{SHIPPING}{FINAL_SALE_SEALED}"
        )

    if "prize pack" in t:
        return (
            f"{title} is a factory-sealed promotional prize pack from the {tcg}, typically distributed "
            f"through official league or tournament events and not available at general retail. It "
            f"arrives new and unopened, exactly as originally packaged. {AUTHENTICITY}{SHIPPING}"
            f"{FINAL_SALE_SEALED}"
        )

    if "booster pack" in t:
        return (
            f"{title} is a single factory-sealed booster pack from the {tcg}, exactly as originally "
            f"packaged and untouched. Each pack contains a randomized assortment of cards from the set, "
            f"making it a great low-commitment way to try a new set or chase a specific card. "
            f"{AUTHENTICITY}{SHIPPING}{FINAL_SALE_SEALED}"
        )

    if "blister" in t:
        return (
            f"{title} is a factory-sealed blister pack from the {tcg}, exactly as originally packaged on "
            f"its retail card/backing and untouched. Blister packs typically bundle a booster pack with "
            f"a promo card or small accessory, making them a popular pick-up for casual collectors and "
            f"players alike. {AUTHENTICITY}{SHIPPING}{FINAL_SALE_SEALED}"
        )

    if "tin" in t or "chest" in t:
        return (
            f"{title} is a factory-sealed collector's tin from the {tcg}, exactly as originally packaged "
            f"and untouched. Tins typically bundle booster packs together with a foil promo card and "
            f"other collectible accessories inside a reusable metal or storage tin, making them a popular "
            f"gift pick as well as a fun way to pick up packs alongside a keepsake container. "
            f"{AUTHENTICITY}{SHIPPING}{FINAL_SALE_SEALED}"
        )

    if "collection box" in t or "premium collection" in t or "upc" in t or "pin collection" in t:
        return (
            f"{title} is a factory-sealed premium collection box from the {tcg}, exactly as originally "
            f"packaged and untouched. These boxes typically bundle booster packs with exclusive foil "
            f"promo cards, oversized cards, pins, or other display accessories, making them a popular "
            f"choice for collectors wanting a themed keepsake alongside their packs. "
            f"{AUTHENTICITY}{SHIPPING}{FINAL_SALE_SEALED}"
        )

    if "mystery bag" in t:
        return (
            f"{title} is a sealed, surprise assortment of {tcg} product curated by ZardoCards. Contents "
            f"are randomized and not revealed until you open it, making it a fun, lower-cost way to add "
            f"variety to your collection. {AUTHENTICITY}{SHIPPING}Mystery bags are final sale and "
            f"contents cannot be requested or exchanged."
        )

    if "giftcard" in t or "gift card" in t:
        return (
            f"{title} lets the recipient choose exactly what they want from our full catalog of "
            f"authentic {tcg} singles, sealed product, and graded slabs, instead of guessing at a "
            f"specific item they may already own or not want. It's delivered electronically and never "
            f"expires, making it an easy, no-guesswork gift for any collector or player on your list. "
            f"There's no shipping to wait for — we email the gift card straight to the recipient's "
            f"inbox as soon as your order is placed, so it can be used right away or saved for a "
            f"special occasion like a birthday or holiday."
        )

    if any(k in t for k in ["vhs", "video", "film", "tape"]):
        return (
            f"{title} is an authentic, officially licensed piece of {tcg} memorabilia, sold exactly as "
            f"originally packaged and untouched. It's a nostalgic pickup for longtime collectors and a "
            f"unique piece of TCG history for newer fans. {AUTHENTICITY}{SHIPPING}{FINAL_SALE_SEALED}"
        )

    # A single raw (ungraded) card has no box/pack/deck/kit/sealed keyword in
    # its title, so anything reaching here that DOES mention one of those is
    # some other sealed product we don't have a more specific template for —
    # describe it honestly as sealed product rather than mislabeling it a card.
    if any(k in t for k in ["box", "pack", "deck", "kit", "sealed", "set"]):
        return (
            f"{title} is an authentic {tcg} product, sold new and factory-sealed exactly as originally "
            f"packaged and untouched since it left the manufacturer. We hand-inspect every item before "
            f"it ships to confirm it's genuine and in the condition described, so you can buy with "
            f"confidence. {AUTHENTICITY}{SHIPPING}{FINAL_SALE_SEALED}"
        )

    return (
        f"{title} is a raw (ungraded) {tcg} card, hand-inspected and condition-checked before it ships. "
        f"We grade condition fairly using an industry-standard scale from Mint to Damaged, and the "
        f"stated condition reflects a thorough evaluation so you know exactly what you're getting. "
        f"{AUTHENTICITY}{SHIPPING}{FINAL_SALE_RAW}"
    )


class Command(BaseCommand):
    help = (
        "Backfills longer, honest product descriptions for products whose current "
        "description is under the minimum length Google Merchant Center requires "
        "(500 characters), using the product's real title/category/vendor data."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Show what would change without saving.",
        )

    def handle(self, *args, **options):
        dry_run = options["dry_run"]
        products = Product.objects.prefetch_related("categories").all()
        updated, skipped = 0, 0

        for product in products:
            current_len = len(strip_tags(product.description))
            if current_len >= MIN_LENGTH:
                skipped += 1
                continue

            new_description = describe(product)
            if dry_run:
                self.stdout.write(f"\n--- {product.handle} (was {current_len} chars) ---")
                self.stdout.write(new_description)
            else:
                product.description = new_description
                product.save(update_fields=["description"])
            updated += 1

        verb = "Would update" if dry_run else "Updated"
        self.stdout.write(self.style.SUCCESS(f"{verb} {updated} products, skipped {skipped} (already long enough)"))
