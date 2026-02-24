-- DropForeignKey
ALTER TABLE "box_fragments" DROP CONSTRAINT "box_fragments_entry_id_fkey";

-- DropForeignKey
ALTER TABLE "boxe_enters" DROP CONSTRAINT "boxe_enters_entry_id_fkey";

-- DropForeignKey
ALTER TABLE "boxes" DROP CONSTRAINT "boxes_exit_id_fkey";

-- AddForeignKey
ALTER TABLE "boxe_enters" ADD CONSTRAINT "boxe_enters_entry_id_fkey" FOREIGN KEY ("entry_id") REFERENCES "entry_v2"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boxes" ADD CONSTRAINT "boxes_exit_id_fkey" FOREIGN KEY ("exit_id") REFERENCES "exit_v2"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "box_fragments" ADD CONSTRAINT "box_fragments_entry_id_fkey" FOREIGN KEY ("entry_id") REFERENCES "entry_v2"("id") ON DELETE CASCADE ON UPDATE CASCADE;
