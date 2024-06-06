import AppContainerLayout from "../components/app/AppContainerLayout";

export default function NotFoundContainer() {
  return (
    <AppContainerLayout>
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <h1 className="fw-bold">Page not found</h1>
      </div>
    </AppContainerLayout>
  );
}
