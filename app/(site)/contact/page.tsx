import ContactForm from "@/app/components/contact/ContactForm";


export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-16 mt-24">
      <div className="space-y-2 px-6">
        <h1 className="text-3xl font-semibold">Contact</h1>
        <p className="text-muted-foreground">
          Send a message and I’ll get back to you.
        </p>
      </div>

      <div className="mt-10">
        <ContactForm/>
      </div>
    </section>
  );
}
