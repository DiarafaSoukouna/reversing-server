-- Table Plans d'Action
CREATE TABLE plans_action (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  objectif TEXT,
  start_date DATE,
  end_date DATE,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table Axes
CREATE TABLE axes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  plan_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  statut VARCHAR(100),
  objetif TEXT,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (plan_id) REFERENCES plans_action(id) ON DELETE CASCADE
);
CREATE TABLE priority ( id INT PRIMARY KEY AUTO_INCREMENT, name varchar(255) NOT NULL, created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);

CREATE TABLE category_user (  id INT AUTO_INCREMENT,  name varchar(100) NOT NULL,  description varchar(255) NOT NULL,  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  PRIMARY KEY (id));

CREATE TABLE utilisateurs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  category_id INT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES category_user(id) ON DELETE SET NULL

);
-- Table Projets
CREATE TABLE projets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    axe_id INT NOT NULL,
    priority_id INT,
    manager INT, 
    name VARCHAR(500) NOT NULL,
    description TEXT,
    objectif TEXT,
    statut VARCHAR(100),
    budget INT DEFAULT NULL,
    start_date DATE,
    end_date DATE,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    target_value FLOAT, 
    current_value FLOAT,
    FOREIGN KEY (manager) REFERENCES utilisateurs(id) ON DELETE SET NULL,
    FOREIGN KEY (axe_id) REFERENCES axes(id) ON DELETE CASCADE,
    FOREIGN KEY (priority_id) REFERENCES priority(id) ON DELETE CASCADE
);

-- Table Indicateurs
CREATE TABLE indicateurs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  project_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  unit VARCHAR(50),
  baseline_value FLOAT,
  target_value FLOAT,
  current_value FLOAT,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projets(id) ON DELETE CASCADE
);

-- Table Evaluations
CREATE TABLE evaluations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  indicator_id INT NOT NULL,
  evaluation_date DATE,
  value FLOAT,
  comment TEXT,
  FOREIGN KEY (indicator_id) REFERENCES indicateurs(id) ON DELETE CASCADE
);

-- Table Utilisateurs
CREATE TABLE permissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE role_permissions (
    role_id INT,
    permission_id INT,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

-- table comptes 
CREATE TABLE comptes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    validity ENUM('D','Y','N') NOT NULL DEFAULT 'Y',
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES utilisateurs(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);
-- Table Taches
CREATE TABLE taches (
    id INT PRIMARY KEY AUTO_INCREMENT,  
    label VARCHAR(4000) NOT NULL,  
    status VARCHAR(10) NOT NULL, 
    utilisateur_id INT,  
    projet_id INT NOT NULL,  
    task_date_done DATETIME NOT NULL DEFAULT '0001-01-01 00:00:00', 
    task_reminder_freq VARCHAR(100) NOT NULL,  
    task_reminder_lastdate DATETIME NOT NULL DEFAULT '0001-01-01 00:00:00',  
    task_reminder_exceptions VARCHAR(500) NOT NULL DEFAULT '',  
    task_range INT NOT NULL, 
    task_date_crea DATETIME NOT NULL DEFAULT '0001-01-01 00:00:00', 
    task_last_modify TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    task_deleted VARCHAR(1) NOT NULL DEFAULT 'N',
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE SET NULL,
    FOREIGN KEY (projet_id) REFERENCES projets(id) ON DELETE CASCADE
);

CREATE TABLE groupes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(255) NOT NULL
);

CREATE TABLE tache_assignations_groupes (
    tache_id INT,
    groupe_id INT,
    PRIMARY KEY (tache_id, groupe_id),
    FOREIGN KEY (tache_id) REFERENCES taches(id) ON DELETE CASCADE,
    FOREIGN KEY (groupe_id) REFERENCES groupes(id) ON DELETE CASCADE
);
CREATE TABLE tache_assignations_utilisateurs (
    tache_id INT,
    utilisateur_id INT,
    PRIMARY KEY (tache_id, utilisateur_id),
    FOREIGN KEY (tache_id) REFERENCES taches(id) ON DELETE CASCADE,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
);
CREATE TABLE projet_groupes (
    projet_id INT,
    groupe_id INT,
    PRIMARY KEY (projet_id, groupe_id),
    FOREIGN KEY (projet_id) REFERENCES projets(id) ON DELETE CASCADE,
    FOREIGN KEY (groupe_id) REFERENCES groupes(id) ON DELETE CASCADE
);
CREATE TABLE projet_utilisateurs (
    projet_id INT,
    utilisateur_id INT,
    PRIMARY KEY (projet_id, utilisateur_id),
    FOREIGN KEY (projet_id) REFERENCES projets(id) ON DELETE CASCADE,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
);
CREATE TABLE groupes_utilisateurs (
    groupe_id INT,
    utilisateur_id INT,
    PRIMARY KEY (groupe_id, utilisateur_id),
    FOREIGN KEY (groupe_id) REFERENCES groupes(id) ON DELETE CASCADE,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
);
-- Table Ressources
CREATE TABLE ressources (
  id INT PRIMARY KEY AUTO_INCREMENT,
  project_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  quantity FLOAT,
  unit VARCHAR(50),
  cost DECIMAL(10, 2),
  FOREIGN KEY (project_id) REFERENCES projets(id) ON DELETE CASCADE
);

-- Table Commentaires
CREATE TABLE commentaires (
  id INT PRIMARY KEY AUTO_INCREMENT,
  project_id INT NOT NULL,
  compte_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projets(id) ON DELETE CASCADE,
  FOREIGN KEY (compte_id) REFERENCES comptes(id) ON DELETE CASCADE
);

-- Table Documents
CREATE TABLE documents (
  id INT PRIMARY KEY AUTO_INCREMENT,
  project_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  file_path VARCHAR(255),
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projets(id) ON DELETE CASCADE
);

-- Table Suggestions (pour la participation publique)
CREATE TABLE suggestions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  compte_id INT NOT NULL,
  project_id INT NOT NULL,
  suggestion_content TEXT NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (compte_id) REFERENCES comptes(id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projets(id) ON DELETE CASCADE
);
CREATE TABLE actualites (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE actualite_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    actualite_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (actualite_id) REFERENCES actualites(id) ON DELETE CASCADE
);
CREATE TABLE newsletter (  
  id int PRIMARY KEY AUTO_INCREMENT,  
  title varchar(200) DEFAULT NULL,  
  body text NOT NULL,  
  posted_by INT NOT NULL DEFAULT '0',  
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  newsletter_statut VARCHAR(5) NOT NULL DEFAULT 'Y',
  FULLTEXT KEY newsletter_index (title, body));

-- Table Votes (pour le système de vote citoyen)
CREATE TABLE votes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  compte_id INT NOT NULL,
  suggestion_id INT NOT NULL,
  vote_value INT CHECK(vote_value IN (1, -1)),
  voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (compte_id) REFERENCES comptes(id) ON DELETE CASCADE,
  FOREIGN KEY (suggestion_id) REFERENCES suggestions(id) ON DELETE CASCADE
);
