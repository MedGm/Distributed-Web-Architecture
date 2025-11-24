package ma.fstt.atelier7_springrest.repositories;

import ma.fstt.atelier7_springrest.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}


