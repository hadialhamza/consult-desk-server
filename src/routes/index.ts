import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { VisaServiceRoutes } from '../modules/visa-service/visaService.route';
import { CountryRoutes } from '../modules/country/country.route';
import { ClientRoutes } from '../modules/client/client.route';
import { BookingRoutes } from '../modules/booking/booking.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { AccountRoutes } from '../modules/account/account.route';
import { CmsRoutes } from '../modules/cms/cms.route';
import { DashboardRoutes } from '../modules/dashboard/dashboard.route';
import { AiRoutes } from '../modules/ai/ai.route';

const router = Router();

const moduleRoutes = [
  { path: '/auth', route: AuthRoutes },
  { path: '/users', route: UserRoutes },
  { path: '/visa-services', route: VisaServiceRoutes },
  { path: '/countries', route: CountryRoutes },
  { path: '/clients', route: ClientRoutes },
  { path: '/bookings', route: BookingRoutes },
  { path: '/reviews', route: ReviewRoutes },
  { path: '/accounts', route: AccountRoutes },
  { path: '/cms', route: CmsRoutes },
  { path: '/dashboard', route: DashboardRoutes },
  { path: '/ai', route: AiRoutes },
];

moduleRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
