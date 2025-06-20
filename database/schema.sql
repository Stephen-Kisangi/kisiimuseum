-- Database: `museum_appointments`

-- Table structure for table `users`
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(255) NOT NULL UNIQUE,
  `password` TEXT NOT NULL,
  `role` ENUM("admin", "user") DEFAULT "user",
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table structure for table `appointments`
CREATE TABLE `appointments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20),
  `appointment_date` DATE NOT NULL,
  `appointment_time` TIME NOT NULL,
  `appointment_type` VARCHAR(255) NOT NULL,
  `guests` INT NOT NULL,
  `notes` TEXT,
  `confirmation_code` VARCHAR(255) NOT NULL UNIQUE,
  `status` ENUM("pending", "confirmed", "cancelled", "completed") DEFAULT "pending",
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a default admin user (password: admin123)
INSERT INTO `users` (`username`, `password`, `role`) VALUES
("admin", "$2y$10$Q.m2.gY.y.p.w.L.j.M.m.Q.R.S.T.U.V.W.X.Y.Z.a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z.A.B.C.D.E.F.G.H.I.J.K.L.M.N.O.P.Q.R.S.T.U.V.W.X.Y.Z.0.1.2.3.4.5.6.7.8.9.Q.m2.gY.y.p.w.L.j.M.m.Q.R.S.T.U.V.W.X.Y.Z.a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z.A.B.C.D.E.F.G.H.I.J.K.L.M.N.O.P.Q.R.S.T.U.V.W.X.Y.Z.0.1.2.3.4.5.6.7.8.9", "admin"); -- Hashed password for 'admin123'


-- IDENTIFIED BY 'MwanyagetingeSecure2025!.'; 
--CREATE USER 'mwanyagetinge-admin'@'localhost'