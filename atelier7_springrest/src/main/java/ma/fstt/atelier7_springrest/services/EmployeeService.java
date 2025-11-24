package ma.fstt.atelier7_springrest.services;

import ma.fstt.atelier7_springrest.entities.Employee;

import java.util.List;

public interface EmployeeService {
    List<Employee> findAll();

    Employee findById(Long id);

    Employee save(Employee employee);

    Employee update(Long id, Employee employee);

    void delete(Long id);
}