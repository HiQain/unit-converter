import { Route, Switch } from "wouter";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import NotFound from "@/pages/not-found";
import { Admin } from "./pages/admin";
import ContactPage from "./pages/contact";
import DisclaimerPage from "./pages/disclaimer";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={Admin} />
      <Route path="/blog" component={Blog} />
      <Route path="/disclaimer" component={DisclaimerPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
