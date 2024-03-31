package com.example.application.data;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final NoteRepository noteRepository;
    private final TaskRepository taskRepository;

    public DatabaseInitializer(NoteRepository noteRepository, TaskRepository taskRepository) {
        this.noteRepository = noteRepository;
        this.taskRepository = taskRepository;
    }

    @Override
    public void run(String... args) {

        if(noteRepository.count() == 0 || taskRepository.count() == 0) {
            // Initialize notes
            List<Note> notes = Arrays.asList(
                    new Note("Note 1 Title", "Note 1 Body"),
                    new Note("Note 2 Title", "Note 2 Body")
                    // Add more notes as needed
            );
            noteRepository.saveAll(notes);

            // Initialize tasks
            List<Task> tasks = Arrays.asList(
                    new Task("Task 1 Title", "Task 1 Description", LocalDate.now().plusDays(7)),
                    new Task("Task 2 Title", "Task 2 Description", LocalDate.now().plusDays(5))
                    // Add more tasks as needed
            );
            taskRepository.saveAll(tasks);
        }
    }
}
